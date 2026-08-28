import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

function InspectorLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar role="inspector" />

      <div className="dashboard-main">
        <Navbar title="Inspector Dashboard" />

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default InspectorLayout;