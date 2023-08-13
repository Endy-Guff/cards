import { FC } from 'react'

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { SignIn } from './components'
import { Cards } from './pages/cards/cards.tsx'
import { Decks } from './pages/decks/decks.tsx'
import { MeResponse } from './services/auth/types.ts'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <SignIn onSubmit={() => {}} />,
  },
]

const privateRoutes: RouteObject[] = [
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
  const isAuth = true

  return isAuth ? <Outlet /> : <Navigate to={'/login'} />
}
