import { baseApi } from '../baseApi.ts'

import { MeResponse } from './types.ts'

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
    }
  },
})

export const { useGetMeQuery } = authApi
