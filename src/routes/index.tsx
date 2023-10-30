import { Outlet, useRoutes } from "react-router-dom";

import Dashboard from "@/pages/Dashboard";

import { ProtectedRoute } from "./protected";
import { FourOhFour } from "@/pages/Error";
import { AuthLayout, MainLayout } from "@/components/layout";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";

const App = ({ title }: { title: string }) => (
  <MainLayout title={title}>
    <Outlet />
  </MainLayout>
);

const routes = [
  // unprotected
  {
    path: "/",
    element: <App title="Home" />,
    children: [
      {
        path: "/",
        element: <Profile />,
      },
    ],
  },
  // protected for unlogged in user
  {
    path: "/",
    element: (
      <AuthLayout>
        <ProtectedRoute roles={[]} />
      </AuthLayout>
    ),
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
    ],
  },
  // protected for admin
  {
    path: "/",
    element: (
      <MainLayout title="Admin">
        <ProtectedRoute roles={["ADMIN"]} />
      </MainLayout>
    ),
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <FourOhFour />,
  },
];

export const AppRoutes = () => {
  const element = useRoutes(routes);

  return <>{element}</>;
};
