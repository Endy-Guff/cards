import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { SignIn } from './components'
import { Decks } from './pages/decks/decks.tsx'

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
]

const router = createBrowserRouter([
  { element: <PrivateRoutes />, children: privateRoutes },
  ...publicRoutes,
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuth = true

  return isAuth ? <Outlet /> : <Navigate to={'/login'} />
}
