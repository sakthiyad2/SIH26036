import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

function AdminLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" />

      <div className="dashboard-main">
        <Navbar title="Admin Dashboard" />

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;