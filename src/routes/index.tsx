import {Outlet, useRoutes} from 'react-router-dom'

import Dashboard from '@/pages/Dashboard'

import {ProtectedRoute} from './protected'
import {FourOhFour} from '@/pages/Error'
import {AuthLayout, MainLayout} from '@/components/layout'
import Login from '@/pages/Login'
import Profile from '@/pages/Profile'
import VerifyUser from '@/pages/Dashboard/verifyuser'
import VerifyCatalog from '@/pages/Dashboard/verifycatalog'
import VerifyReport from '@/pages/Dashboard/report'
import Post from '@/pages/Post'

const App = ({title}: {title: string}) => (
  <MainLayout title={title}>
    <Outlet />
  </MainLayout>
)

const routes = [
  {
    path: '/',
    element: <App title="Home" />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
    ],
  },
  // unprotected
  {
    path: '/profile/:id',
    element: <App title="Profile" />,
    children: [
      {
        path: '/profile/:id',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/post/:id',
    element: <App title="Post Detail" />,
    children: [
      {
        path: '/post/:id',
        element: <Post />,
      },
    ],
  },
  // protected for unlogged in user
  {
    path: '/',
    element: (
      <AuthLayout>
        <ProtectedRoute roles={[]} />
      </AuthLayout>
    ),
    children: [
      {
        path: '/auth/login',
        element: <Login />,
      },
    ],
  },
  // protected for logged in user
  {
    path: '/profile',
    element: <App title="Profile" />,
    children: [
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  // protected for admin
  {
    path: '/',
    element: <App title="Admin Dashboard" />,
    // {/* <ProtectedRoute roles={["ADMIN"]} /> */}

    children: [
      {
        path: '/admin/dashboard',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '*',
    element: <FourOhFour />,
  },
  {
    path: '/',
    element: <App title="Admin Dashboard - Verify Users" />,
    // {/* <ProtectedRoute roles={["ADMIN"]} /> */}

    children: [
      {
        path: '/admin/dashboard/verifyuser',
        element: <VerifyUser />,
      },
    ],
  },
  {
    path: '/',
    element: <App title="Admin Dashboard - Verify Catalog" />,
    // {/* <ProtectedRoute roles={["ADMIN"]} /> */}

    children: [
      {
        path: '/admin/dashboard/verifycatalog',
        element: <VerifyCatalog />,
      },
    ],
  },
  {
    path: '/',
    element: <App title="Admin Dashboard - Verify Report" />,
    // {/* <ProtectedRoute roles={["ADMIN"]} /> */}

    children: [
      {
        path: '/admin/dashboard/verifyreport',
        element: <VerifyReport />,
      },
    ],
  },
  {
    path: '*',
    element: <App title="Not Found" />,
    children: [
      {
        path: '*',
        element: <FourOhFour />,
      },
    ],
  },
]

export const AppRoutes = () => {
  const element = useRoutes(routes)

  return <>{element}</>
}
