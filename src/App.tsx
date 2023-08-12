import { Router } from './router.tsx'
import { useGetMeQuery } from './services/auth'

export function App() {
  const { isLoading, data } = useGetMeQuery()

  if (isLoading) return <div>Loading...</div>

  return <Router meData={data} />
}
