import { apiSlice } from "./api";
import { logOut, setCredentials } from "../slice/authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    firebaseLogin: builder.mutation({
      query: (credentials) => ({
        url: "/firebase-auth",
        method: "POST",
        body: credentials,
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logOut({}));
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.query({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      providesTags: [{ type: "Auth", id: "REFRESH" }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { accessToken, user } = data;
          dispatch(setCredentials({ accessToken, user }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    register: builder.mutation({
      query: (params) => ({
        url: "/auth/register",
        method: "POST",
        body: params,
      }),
      invalidatesTags: [{ type: "Auth", id: "REFRESH" }],
    }),
    verifyEmail: builder.mutation({
      query: (params) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: params,
      }),
      invalidatesTags: [{ type: "Auth", id: "REFRESH" }],
    }),
    requestResetPassword: builder.mutation({
      query: (params) => ({
        url: "/auth/reset-password-request",
        method: "POST",
        body: params,
      }),
      invalidatesTags: [{ type: "Auth", id: "REFRESH" }],
    }),
    setResetedPassword: builder.mutation({
      query: (params) => ({
        url: "/auth/set-reseted-password",
        method: "POST",
        body: params,
      }),
      invalidatesTags: [{ type: "Auth", id: "REFRESH" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useFirebaseLoginMutation,
  useSendLogoutMutation,
  useRefreshQuery,
  useRegisterMutation,
  useVerifyEmailMutation,
  useRequestResetPasswordMutation,
  useSetResetedPasswordMutation,
} = authApiSlice;
