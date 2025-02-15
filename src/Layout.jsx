
import TopMenu from "./components/TopMenu";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <>

      <TopMenu />
     
      <div id="container">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default Layout;
