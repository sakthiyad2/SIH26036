import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";

import "./OwnerLayout.css";

function OwnerLayout() {
  return (
    <div className="dashboard-layout">

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