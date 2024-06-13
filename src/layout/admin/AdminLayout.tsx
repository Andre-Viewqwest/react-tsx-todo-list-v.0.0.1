import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidenav from "../../component/admin/sidenav/Sidenav";
import Header from "../../component/admin/header/Header";
import { HamburgerContext } from "../../context/HamburgerContext";

const AdminLayout: React.FC = () => {
  const { hamburger } = useContext(HamburgerContext);

  return (
    <>
      <div className="w-full">
        <aside
          className={`${
            !hamburger.isOpen ? "hidden" : ""
          } md:block relative z-50`}
        >
          <Sidenav />
        </aside>
        <main>
          <Header />
          <div className={`${hamburger.isOpen ? "hidden" : ""}`}>
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
