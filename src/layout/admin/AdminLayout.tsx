import { Outlet } from "react-router-dom";
import Sidenav from "../../component/admin/sidenav/Sidenav";
const AdminLayout: React.FC = () => {
  return (
    <>
      <div>
        <aside>
          <Sidenav />
        </aside>
        <main>
          <h1>Header</h1> <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
