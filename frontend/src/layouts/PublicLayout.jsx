import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import "./PublicLayout.css";

function PublicLayout() {
  return (
    <div className="public-layout">

      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= PAGE CONTENT ================= */}
      <main className="public-content">
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="public-footer">

        <div className="footer-content">

          {/* BRAND */}
          <div className="footer-brand">

            <div className="footer-logo">
              ⚖️
            </div>

            <div>
              <h3>SIH26036</h3>

              <p>
                Online Verification System
              </p>
            </div>

          </div>


          {/* DESCRIPTION */}
          <div className="footer-description">

            <p>
              Digital verification system for
              weighing and measuring instruments.
            </p>

          </div>


          {/* LINKS */}
          <div className="footer-links">

            <h4>
              Quick Links
            </h4>

            <div>

              <Link to="/">
                Home
              </Link>

              <Link to="/about">
                About
              </Link>

              <Link to="/verify-certificate">
                Verify Certificate
              </Link>

              <Link to="/search-instrument">
                Search Instrument
              </Link>

              <Link to="/contact">
                Contact
              </Link>

            </div>

          </div>

        </div>


        {/* FOOTER BOTTOM */}
        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} SIH26036.
            All rights reserved.
          </p>

          <p>
            Online Verification System
          </p>

        </div>

      </footer>

    </div>
  );
}

export default PublicLayout;