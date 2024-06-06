import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidenav from "../../component/admin/sidenav/Sidenav";
import Header from "../../component/admin/header/Header";
import { HamburgerContext } from "../../context/HamburgerContext";
import { useMediaQuery } from "@mantine/hooks";

const AdminLayout: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { hamburger } = useContext(HamburgerContext);

  // Log the hamburger state whenever it changes
  useEffect(() => {
    console.log();
  }, [hamburger]);

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
