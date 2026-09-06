import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import "./OwnerLayout.css";

function OfficialLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <Sidebar role="official" mobileOpen={sidebarOpen} />
      </aside>

      <div className="dashboard-main">
        <Navbar onMenuToggle={() => setSidebarOpen((open) => !open)} menuOpen={sidebarOpen} title="Official Dashboard" />

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default OfficialLayout;