import { Outlet } from "react-router-dom";
import { Navbar } from "../../components";
import "./Layout.scss";

const Layout = () => {
  return (
    <div className="app__layout">
      <Navbar />
      <div className="app__layout-outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
