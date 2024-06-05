import { Outlet } from "react-router-dom";
import Sidenav from "../../component/admin/sidenav/Sidenav";
import Header from "../../component/admin/header/Header";

const AdminLayout: React.FC = () => {
  return (
    <>
      <div className="w-full">
        <aside className="hidden md:block">
          <Sidenav />
        </aside>
        <main>
          <Header />
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
