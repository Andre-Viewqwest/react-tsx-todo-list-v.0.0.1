// Layout
import AdminLayout from "./layout/admin/AdminLayout";
import GuestLayout from "./layout/guest/GuestLayout";

// Component
// import NotFound from "./z-global/NotFound";

// Guest Views
import HomeViews from "./views/guest/HomeViews";
import LoginViews from "./views/guest/authentication/LoginViews";
import ResetPasswordViews from "./views/guest/authentication/ResetPasswordViews";
import SignupViews from "./views/guest/authentication/SignupViews";
import UpdatePasswordViews from "./views/guest/authentication/UpdatePasswordViews";
import VerificationViews from "./views/guest/authentication/VerificationViews";

// Admin Views
import LogsViews from "./views/admin/LogsViews";
import OverviewViews from "./views/admin/OverviewViews";
import TodoViews from "./views/admin/TodoViews";

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

const routerConfig: Record<string, RouteConfig[]> = {
  guest: [
    {
      path: "/",
      element: <GuestLayout />,
      children: [
        {
          path: "/",
          element: <HomeViews />,
        },
        {
          path: "/login",
          element: <LoginViews />,
        },
        {
          path: "/signup",
          element: <SignupViews />,
        },
        {
          path: "/verification",
          element: <VerificationViews />,
        },
        {
          path: "/reset-password",
          element: <ResetPasswordViews />,
        },
        {
          path: "/update-password",
          element: <UpdatePasswordViews />,
        },
      ],
    },
    // {F
    //   path: "*",
    //   element: <NotFound />,
    // },
  ],

  auth: [
    {
      path: "/",
      element: <AdminLayout />,
      children: [
        {
          path: "/",
          element: <OverviewViews />,
        },
        {
          path: "/logs",
          element: <LogsViews />,
        },
        {
          path: "/todo",
          element: <TodoViews />,
        },
      ],
    },
    // {
    //   path: "*",
    //   element: <NotFound />,
    // },
  ],
};

export default routerConfig;
