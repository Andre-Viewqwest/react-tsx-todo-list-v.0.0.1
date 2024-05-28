import { Outlet } from "react-router-dom";
import Header from "../../component/guest/header/Header";
import Footer from "../../component/guest/footer/Footer";

const GuestLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default GuestLayout;
