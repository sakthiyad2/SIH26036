import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import "./OwnerLayout.css";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <Sidebar role="admin" mobileOpen={sidebarOpen} />
      </aside>

      <div className="dashboard-main">
        <Navbar onMenuToggle={() => setSidebarOpen((open) => !open)} menuOpen={sidebarOpen} title="Admin Dashboard" />

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;