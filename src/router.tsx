// Layout
import GuestLayout from "./layout/guest/GuestLayout";
// import AdminLayout from "./layout/admin/AdminLayout";

// Component
// import NotFound from "./z-global/NotFound";

// Guest Views
import HomeViews from "./views/guest/HomeViews";
import LoginViews from "./views/guest/authentication/LoginViews";
import ResetPasswordViews from "./views/guest/authentication/ResetPasswordViews";
import SignupViews from "./views/guest/authentication/SignupViews";
import UpdatePasswordViews from "./views/guest/authentication/UpdatePasswordViews";
import Verification from "./views/guest/authentication/VerificationViews";

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
          element: <Verification />,
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
    // {
    //   path: "*",
    //   element: <NotFound />,
    // },
  ],

  // admin: [
  //   {
  //     path: "/",
  //     element: <AdminLayout />,
  //     children: [
  //       {
  //         path: "/a",
  //         element: <OverView />,
  //       },
  //     ],
  //   },
  //   {
  //     path: "*",
  //     element: <NotFound />,
  //   },
  // ],
};

export default routerConfig;
