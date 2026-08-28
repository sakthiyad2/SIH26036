import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

import "./OwnerLayout.css";

function OwnerLayout() {
  return (
    <div className="dashboard-layout">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="dashboard-sidebar">
        <Sidebar role="owner" />
      </aside>


      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <div className="dashboard-main">

        {/* ===================================================
            NAVBAR
        =================================================== */}

        <header className="dashboard-navbar">
          <Navbar title="Owner Dashboard" />
        </header>


        {/* ===================================================
            PAGE CONTENT
        =================================================== */}

        <main className="dashboard-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default OwnerLayout;