import { baseApi } from '../baseApi.ts'

import { LoginArgs, MeResponse, SignUpArgs } from './types.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getMe: builder.query<MeResponse, void>({
        query: () => {
          return {
            url: `v1/auth/me`,
          }
        },
      }),
      login: builder.mutation<any, LoginArgs>({
        query: ({ email, password, rememberMe }) => {
          return {
            url: 'v1/auth/login',
            method: 'POST',
            body: { email, password, rememberMe },
          }
        },
      }),
      signUp: builder.mutation<any, SignUpArgs>({
        query: ({ email, password }) => {
          return {
            url: 'v1/auth/sign-up',
            method: 'POST',
            body: { email, password },
          }
        },
      }),
    }
  },
})

export const { useGetMeQuery, useLoginMutation, useSignUpMutation } = authApi
