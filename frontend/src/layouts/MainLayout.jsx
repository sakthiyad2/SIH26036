import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

function MainLayout() {
  return (
    <div className="main-layout">
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;