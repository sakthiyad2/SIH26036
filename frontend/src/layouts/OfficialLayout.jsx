import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

function OfficialLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar role="official" />

      <div className="dashboard-main">
        <Navbar title="Official Dashboard" />

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default OfficialLayout;