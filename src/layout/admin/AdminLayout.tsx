import { Outlet } from "react-router-dom";
import Sidenav from "../../component/admin/sidenav/Sidenav";
import Header from "../../component/admin/header/Header";
const AdminLayout: React.FC = () => {
  return (
    <>
      <div>
        <aside>
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
