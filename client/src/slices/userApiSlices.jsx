import { apiSlice } from "./apiSlices";
import { USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
        query: (data) => ({
            url: `${USERS_URL}`,
            method: 'POST',
            body: data,
        }),
    }),
    login: builder.mutation({
        query: (data) => ({
            url: `${USERS_URL}/login`,
            method: 'POST',
            body: data,
          }),
        }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    getUserProfile: builder.query({
      query: ()=>({
        url: `${USERS_URL}/profile`
      })
    }),
    updateUserProfile: builder.mutation({
      query: (data)=>({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data
      })
    })
  }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation
} = userApiSlice;