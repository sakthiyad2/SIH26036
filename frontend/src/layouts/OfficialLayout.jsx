import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import "./OwnerLayout.css";

function OfficialLayout() {
  return (
    <div className="dashboard-layout">
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