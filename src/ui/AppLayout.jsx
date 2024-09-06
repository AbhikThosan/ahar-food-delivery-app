import Navbar from "./Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="px-[70px] pt-10 bg-gradient-to-tr from-white to-red-50">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;
