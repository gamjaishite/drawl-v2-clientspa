import {useAuth} from '@/hooks'
import {useEffect} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'

interface ProtectedRouteProps {
  roles: string[]
}

export const ProtectedRoute = ({roles}: ProtectedRouteProps) => {
  const auth = useAuth()
  const navigate = useNavigate()

  console.log(roles, auth.user?.role)

  const protect = () => {
    if (!auth.loading) {
      if (roles.length > 0) {
        if (!auth.isLoggedIn || !auth.user) {
          navigate('/404')
          return
        }

        if (!roles.includes(auth.user.role)) {
          navigate('/404')
          return
        }
      } else if (auth.isLoggedIn && auth.user) {
        navigate('/')
        return
      }
    }
  }

  useEffect(protect, [auth.isLoggedIn, auth.user, navigate, roles, auth.loading])

  if (auth.loading)
    return (
      <div className="flex justify-center items-center w-screen h-screen fixed z-50 top-0 left-0 bg-black/30 backdrop-blur-xl">
        <p>Loading...</p>
      </div>
    )

  return <Outlet />
}
