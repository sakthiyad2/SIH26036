import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import "./OwnerLayout.css";

function InspectorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <Sidebar role="inspector" mobileOpen={sidebarOpen} />
      </aside>

      <div className="dashboard-main">
        <Navbar onMenuToggle={() => setSidebarOpen((open) => !open)} menuOpen={sidebarOpen} title="Inspector Dashboard" />

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default InspectorLayout;