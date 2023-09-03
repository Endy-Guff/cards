import { FC } from 'react'

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Cards } from './pages/cards/cards.tsx'
import { Decks } from './pages/decks/decks.tsx'
import { SignInPage } from './pages/sign-in/sign-in.tsx'
import { SignUpPage } from './pages/sign-up/sign-up.tsx'
import { useGetMeQuery } from './services/auth'
import { MeResponse } from './services/auth/types.ts'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <SignInPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
]

const privateRoutes: RouteObject[] = [
  { path: '*', element: <Navigate to={'/'} /> },
  {
    path: '/',
    element: <Decks />,
  },
  {
    path: '/deck/:deckId',
    element: <Cards />,
  },
]

const router = createBrowserRouter([
  { element: <PrivateRoutes />, children: privateRoutes },
  ...publicRoutes,
])

type RouterPropsType = { meData: MeResponse | undefined }
export const Router: FC<RouterPropsType> = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { data, isLoading } = useGetMeQuery()

  if (isLoading) return <div>Loading...</div>
  const isAuth = !!data

  return isAuth ? <Outlet /> : <Navigate to={'/login'} />
}
