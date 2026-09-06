import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { clearAuthStorage } from "../../utils/storage";
import "./Navbar.css";

function Navbar({ onMenuToggle, menuOpen: controlledMenuOpen }) {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const isMenuOpen = controlledMenuOpen ?? menuOpen;
  /* =====================================================
     USER INFORMATION
  ===================================================== */

  const userName =
    user?.full_name ||
    user?.name ||
    user?.fullName ||
    "User";

  const userEmail = user?.email || "";

  const userRole = user?.role || "OWNER";


  /* =====================================================
     USER INITIALS
  ===================================================== */

  const getInitials = () => {
    const name = userName.trim();

    if (!name) {
      return "U";
    }

    const parts = name.split(/\s+/);

    if (parts.length >= 2) {
      return (
        parts[0].charAt(0) +
        parts[parts.length - 1].charAt(0)
      ).toUpperCase();
    }

    return name.substring(0, 2).toUpperCase();
  };


  /* =====================================================
     ROLE DISPLAY
  ===================================================== */

  const getRoleName = () => {
    switch (userRole) {
      case "OWNER":
        return "Instrument Owner";

      case "INSPECTOR":
        return "Inspector";

      case "ADMIN":
        return "Administrator";

      case "OFFICIAL":
        return "Government Official";

      default:
        return "User";
    }
  };


  /* =====================================================
     DASHBOARD LINK
  ===================================================== */

  const getDashboardPath = () => {
    switch (userRole) {
      case "OWNER":
        return "/owner/dashboard";

      case "INSPECTOR":
        return "/inspector/dashboard";

      case "ADMIN":
        return "/admin/dashboard";

      case "OFFICIAL":
        return "/official/dashboard";

      default:
        return "/";
    }
  };


  /* =====================================================
     PROFILE LINK
  ===================================================== */

  const getProfilePath = () => {
    switch (userRole) {
      case "OWNER":
        return "/owner/profile";

      case "INSPECTOR":
        return "/inspector/profile";

      case "ADMIN":
        return "/admin/profile";

      case "OFFICIAL":
        return "/official/profile";

      default:
        return "/";
    }
  };


  /* =====================================================
     NOTIFICATION LINK
  ===================================================== */

  const getNotificationPath = () => {
    switch (userRole) {
      case "OWNER":
        return "/owner/notifications";

      case "INSPECTOR":
        return "/inspector/notifications";

      case "ADMIN":
        return "/admin/notifications";

      case "OFFICIAL":
        return "/official/notifications";

      default:
        return "/";
    }
  };


  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = async () => {
    try {
      if (logout) {
        await logout();
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuthStorage();

      setProfileOpen(false);
      setMenuOpen(false);

      navigate("/login");
    }
  };


  /* =====================================================
     CLOSE MOBILE MENU
  ===================================================== */

  const closeMenu = () => {
    setMenuOpen(false);
  };


  /* =====================================================
     NAVIGATION LINKS
  ===================================================== */

  const publicLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Verify Certificate",
      path: "/verify-certificate",
    },
    {
      name: "Search Instrument",
      path: "/search-instrument",
    },
  ];


  return (
    <>
      {/* =================================================
          NAVBAR
      ================================================= */}

      <nav className="navbar">

        {/* =================================================
            LEFT SECTION
        ================================================= */}

        <div className="navbar-left">

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            className="navbar-menu-button"
            onClick={() => onMenuToggle ? onMenuToggle() : setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>


          {/* LOGO */}

          <NavLink
            to="/"
            className="navbar-logo"
            onClick={closeMenu}
          >
            SIH
          </NavLink>


          {/* BRAND */}

          <div className="navbar-brand">

            <span className="navbar-brand-title">
              Verification Portal
            </span>

            <span className="navbar-brand-subtitle">
              Weights &amp; Measures
            </span>

          </div>

        </div>


        {/* =================================================
            CENTER NAVIGATION
        ================================================= */}

        <div
          className={`navbar-menu ${
            isMenuOpen ? "open" : ""
          }`}
        >

          {/* PUBLIC LINKS */}

          {publicLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `navbar-link ${
                  isActive ? "active" : ""
                }`
              }
              onClick={closeMenu}
            >
              {link.name}
            </NavLink>
          ))}


          {/* DASHBOARD LINK FOR LOGGED-IN USER */}

          {user && (
            <NavLink
              to={getDashboardPath()}
              className={({ isActive }) =>
                `navbar-link ${
                  isActive ? "active" : ""
                }`
              }
              onClick={closeMenu}
            >
              Dashboard
            </NavLink>
          )}

        </div>


        {/* =================================================
            RIGHT SECTION
        ================================================= */}

        <div className="navbar-right">

          {/* =================================================
              SEARCH
          ================================================= */}

          <div className="navbar-search">

            <span className="navbar-search-icon">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search..."
              aria-label="Search"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  const value =
                    event.target.value.trim();

                  if (value) {
                    navigate(
                      `/search-instrument?query=${encodeURIComponent(
                        value
                      )}`
                    );

                    event.target.value = "";
                  }
                }
              }}
            />

          </div>


          {/* =================================================
              NOTIFICATION
          ================================================= */}

          {user && (
            <button
              type="button"
              className="navbar-notification"
              onClick={() => {
                navigate(getNotificationPath());
              }}
              aria-label="Notifications"
            >

              <span>
                🔔
              </span>

              <span className="notification-badge">
                0
              </span>

            </button>
          )}


          {/* =================================================
              USER PROFILE
          ================================================= */}

          {user ? (

            <div
              className={`navbar-user ${
                profileOpen ? "open" : ""
              }`}
              onClick={() =>
                setProfileOpen(!profileOpen)
              }
            >

              {/* =================================================
                  AVATAR
              ================================================= */}

              <div className="navbar-avatar">
                {getInitials()}
              </div>


              {/* =================================================
                  ACTUAL USER INFORMATION
              ================================================= */}

              <div className="navbar-user-info">

                <span className="navbar-user-name">
                  {userName}
                </span>

                <span className="navbar-user-role">
                  {getRoleName()}
                </span>

              </div>


              {/* =================================================
                  DROPDOWN ARROW
              ================================================= */}

              <span className="navbar-dropdown-arrow">
                ▼
              </span>


              {/* =================================================
                  DROPDOWN
              ================================================= */}

              {profileOpen && (

                <div
                  className="navbar-dropdown"
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                >

                  {/* =================================================
                      DROPDOWN HEADER
                  ================================================= */}

                  <div className="navbar-dropdown-header">

                    <div className="navbar-dropdown-name">
                      {userName}
                    </div>

                    {userEmail && (
                      <div className="navbar-dropdown-email">
                        {userEmail}
                      </div>
                    )}

                    <div className="navbar-dropdown-role">
                      {getRoleName()}
                    </div>

                  </div>


                  {/* =================================================
                      PROFILE
                  ================================================= */}

                  <button
                    type="button"
                    className="navbar-dropdown-item"
                    onClick={() => {
                      setProfileOpen(false);

                      navigate(
                        getProfilePath()
                      );
                    }}
                  >

                    <span>
                      👤
                    </span>

                    <span>
                      My Profile
                    </span>

                  </button>


                  {/* =================================================
                      DASHBOARD
                  ================================================= */}

                  <button
                    type="button"
                    className="navbar-dropdown-item"
                    onClick={() => {
                      setProfileOpen(false);

                      navigate(
                        getDashboardPath()
                      );
                    }}
                  >

                    <span>
                      📊
                    </span>

                    <span>
                      Dashboard
                    </span>

                  </button>


                  {/* =================================================
                      LOGOUT
                  ================================================= */}

                  <button
                    type="button"
                    className="navbar-dropdown-item logout"
                    onClick={handleLogout}
                  >

                    <span>
                      🚪
                    </span>

                    <span>
                      Logout
                    </span>

                  </button>

                </div>

              )}

            </div>

          ) : (

            /* =================================================
               LOGIN / REGISTER
            ================================================= */

            <div className="action-buttons">

              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() =>
                  navigate("/login")
                }
              >
                Login
              </button>

              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() =>
                  navigate("/register")
                }
              >
                Register
              </button>

            </div>

          )}

        </div>

      </nav>


      {/* =================================================
          NAVBAR SPACER
      ================================================= */}

      <div className="navbar-spacer" />

    </>
  );
}

export default Navbar;