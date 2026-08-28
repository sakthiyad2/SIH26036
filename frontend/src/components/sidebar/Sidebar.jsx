import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ role = "owner" }) {
  const menus = {
    owner: [
      {
        label: "Dashboard",
        path: "/owner/dashboard",
        icon: "🏠",
      },
      {
        label: "My Instruments",
        path: "/owner/instruments",
        icon: "⚖️",
      },
      {
        label: "Applications",
        path: "/owner/applications",
        icon: "📋",
      },
      {
        label: "Certificates",
        path: "/owner/certificates",
        icon: "📜",
      },
      {
        label: "Notifications",
        path: "/owner/notifications",
        icon: "🔔",
      },
    ],

    inspector: [
      {
        label: "Dashboard",
        path: "/inspector/dashboard",
        icon: "🏠",
      },
      {
        label: "Assigned Applications",
        path: "/inspector/applications",
        icon: "📋",
      },
      {
        label: "Inspection",
        path: "/inspector/inspection",
        icon: "🔍",
      },
      {
        label: "Inspection History",
        path: "/inspector/history",
        icon: "📊",
      },
      {
        label: "Notifications",
        path: "/inspector/notifications",
        icon: "🔔",
      },
    ],

    admin: [
      {
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: "🏠",
      },
      {
        label: "Users",
        path: "/admin/users",
        icon: "👥",
      },
      {
        label: "Inspectors",
        path: "/admin/inspectors",
        icon: "👨‍💼",
      },
      {
        label: "Applications",
        path: "/admin/applications",
        icon: "📋",
      },
      {
        label: "Instruments",
        path: "/admin/instruments",
        icon: "⚖️",
      },
      {
        label: "Certificates",
        path: "/admin/certificates",
        icon: "📜",
      },
      {
        label: "Reports",
        path: "/admin/reports",
        icon: "📈",
      },
      {
        label: "Audit Logs",
        path: "/admin/audit-logs",
        icon: "📝",
      },
    ],

    official: [
      {
        label: "Dashboard",
        path: "/official/dashboard",
        icon: "🏠",
      },
    ],
  };

  const currentMenus = menus[role] || menus.owner;

  return (
    <aside className="sidebar">

      {/* Logo / Brand */}
      <div className="sidebar-logo">

        <div className="logo-icon">
          ⚖️
        </div>

        <div className="sidebar-brand">
          <h2>SIH26036</h2>
          <span>Verification System</span>
        </div>

      </div>


      {/* Navigation */}
      <nav className="sidebar-menu">

        {currentMenus.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >

            <span className="sidebar-icon">
              {item.icon}
            </span>

            <span className="sidebar-link-text">
              {item.label}
            </span>

          </NavLink>
        ))}

      </nav>


      {/* Bottom information */}
      <div className="sidebar-footer">

        <div className="status-dot"></div>

        <div>
          <strong>System Online</strong>
          <span>SIH26036</span>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;