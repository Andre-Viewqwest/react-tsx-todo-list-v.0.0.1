// Layout
import GuestLayout from "./layout/guest/GuestLayout";
// import AdminLayout from "./layout/admin/AdminLayout";

// Component
// import NotFound from "./z-global/NotFound";

// Guest Views
import HomeViews from "./views/guest/HomeViews";
import LoginViews from "./views/guest/LoginViews";

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
