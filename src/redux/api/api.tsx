import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { v4 as uuidv4 } from "uuid";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState } from "../store";
import { setCredentials } from "../slice/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/v1/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    // deviceUUID
    let deviceUUID = window.localStorage.getItem("deviceUUID");
    if (!deviceUUID) {
      deviceUUID = uuidv4();
      window.localStorage.setItem("deviceUUID", deviceUUID);
    }
    headers.set("Device-Uuid", deviceUUID);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  console.log(args); // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions);
  console.log("result?.meta?.response.status:", result.meta?.response?.status);
  // If you want, handle other status codes, too
  if (result.error && result.error.status === 403) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data = { message: "Your login has expired." };
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Role", "Auth"],
  endpoints: (builder) => ({}),
});
