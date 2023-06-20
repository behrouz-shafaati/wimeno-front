import { apiSlice } from "./api";
// import { logOut, setCredentials } from "../slice/shopSlice";

export const shopApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query({
      query: (query) => ({
        url: "/shops/search",
        params: { query },
      }),
    }),
    registerShop: builder.mutation({
      query: (params) => ({
        url: "/shop/register",
        method: "POST",
        body: params,
      }),
    }),
  }),
});

export const { useRegisterShopMutation, useLazySearchQuery } = shopApiSlice;
