import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./OwnerDashboard.css";
import api from "../../services/api";
import InstrumentTable from "../../components/instruments/InstrumentTable";

function OwnerDashboard() {
  const [stats, setStats] = useState({
    instruments: 0,
    applications: 0,
    verified: 0,
    certificates: 0,
  });

  const [instruments, setInstruments] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [instrumentsResult, applicationsResult] =
        await Promise.allSettled([
          api.get("/instruments/my"),
          api.get("/applications/my")
        ]);

      if (instrumentsResult.status === "rejected") {
        throw instrumentsResult.reason;
      }

      const instrumentList = instrumentsResult.value.data?.data || [];
      const ownerApplications = applicationsResult.status === "fulfilled"
        ? applicationsResult.value.data?.data || []
        : [];

      setInstruments(instrumentList);
      setStats({
        instruments: instrumentList.length,
        applications: ownerApplications.length,
        verified: instrumentList.filter(
          (instrument) => instrument.status === "VERIFIED"
        ).length,
        certificates: 0,
      });
      setApplications(ownerApplications);

      if (applicationsResult.status === "rejected") {
        setError("Applications could not be loaded, but your instrument count is up to date.");
      }
    } catch (error) {
      console.error("Failed to load owner dashboard:", error);
      setStats({
        instruments: 0,
        applications: 0,
        verified: 0,
        certificates: 0,
      });
      setInstruments([]);
      setApplications([]);
      setError(error.response?.data?.message || "Unable to load your dashboard data. Please sign in again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="owner-dashboard">

      {/* =====================================================
          DASHBOARD HEADER
      ===================================================== */}

      <section className="owner-dashboard-header">

        <div>

          <span className="dashboard-label">
            OWNER PORTAL
          </span>

          <h1>
            Owner Dashboard
          </h1>

          <p>
            Manage your instruments, applications,
            certificates and verification services.
          </p>

        </div>

      </section>

      {error && <div className="alert alert-error">{error}</div>}


      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <section className="owner-stats">

        {/* MY INSTRUMENTS */}

        <div className="owner-stat-card">

          <div className="stat-icon">
            ⚖️
          </div>

          <div>

            <span>
              My Instruments
            </span>

            <strong>
              {loading
                ? "..."
                : stats.instruments}
            </strong>

          </div>

        </div>


        {/* APPLICATIONS */}

        <div className="owner-stat-card">

          <div className="stat-icon">
            📄
          </div>

          <div>

            <span>
              Applications
            </span>

            <strong>
              {loading
                ? "..."
                : stats.applications}
            </strong>

          </div>

        </div>


        {/* VERIFIED */}

        <div className="owner-stat-card">

          <div className="stat-icon">
            ✓
          </div>

          <div>

            <span>
              Verified
            </span>

            <strong>
              {loading
                ? "..."
                : stats.verified}
            </strong>

          </div>

        </div>


        {/* CERTIFICATES */}

        <div className="owner-stat-card">

          <div className="stat-icon">
            📜
          </div>

          <div>

            <span>
              Certificates
            </span>

            <strong>
              {loading
                ? "..."
                : stats.certificates}
            </strong>

          </div>

        </div>

      </section>


      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <section className="quick-actions-section">

        <div className="section-heading">

          <div>

            <span className="section-label">
              SERVICES
            </span>

            <h2>
              Quick Actions
            </h2>

            <p>
              Access the most commonly used
              verification services.
            </p>

          </div>

        </div>


        <div className="quick-actions-grid">

          {/* =================================================
              REGISTER INSTRUMENT
          ================================================= */}

          <Link
            to="/owner/instruments/add"
            className="quick-action-card primary-action"
          >

            <div className="quick-action-icon">
              ⚖️
            </div>

            <div className="quick-action-content">

              <h3>
                Register Instrument
              </h3>

              <p>
                Register a new weighing or measuring
                instrument for verification.
              </p>

              <span className="action-link">
                Add Instrument →
              </span>

            </div>

          </Link>


          {/* =================================================
              VERIFY CERTIFICATE
          ================================================= */}

          <Link
            to="/verify-certificate"
            className="quick-action-card"
          >

            <div className="quick-action-icon">
              ✓
            </div>

            <div className="quick-action-content">

              <h3>
                Verify Certificate
              </h3>

              <p>
                Check the authenticity and current
                status of a verification certificate.
              </p>

              <span className="action-link">
                Check Certificate →
              </span>

            </div>

          </Link>


          {/* =================================================
              MY INSTRUMENTS
          ================================================= */}

          <Link
            to="/owner/instruments"
            className="quick-action-card"
          >

            <div className="quick-action-icon">
              📋
            </div>

            <div className="quick-action-content">

              <h3>
                My Instruments
              </h3>

              <p>
                View and manage instruments registered
                under your account.
              </p>

              <span className="action-link">
                View Instruments →
              </span>

            </div>

          </Link>


          {/* =================================================
              MY CERTIFICATES
          ================================================= */}

          <Link
            to="/owner/certificates"
            className="quick-action-card"
          >

            <div className="quick-action-icon">
              📜
            </div>

            <div className="quick-action-content">

              <h3>
                My Certificates
              </h3>

              <p>
                View certificates issued for your
                verified instruments.
              </p>

              <span className="action-link">
                View Certificates →
              </span>

            </div>

          </Link>

        </div>

      </section>


      {/* =====================================================
          MY INSTRUMENTS LIST
      ===================================================== */}

      <section className="recent-applications-section">
        <div className="recent-header">
          <div>
            <span className="section-label">
              MY INSTRUMENTS
            </span>
            <h2>
              Your Registered Instruments
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="empty-applications">
            Loading instruments...
          </div>
        ) : instruments.length === 0 ? (
          <div className="empty-applications">
            <div className="empty-icon">⚖️</div>
            <h3>No instruments registered yet.</h3>
            <p>Add your first instrument to begin verification.</p>
            <Link to="/owner/instruments/add" className="empty-action-button">
              Add Instrument
            </Link>
          </div>
        ) : (
          <InstrumentTable
            instruments={instruments.slice(0, 5)}
            onView={(instrument) =>
              (window.location.href = `/owner/instruments/${instrument.instrument_id}`)
            }
          />
        )}
      </section>


      {/* =====================================================
          RECENT APPLICATIONS
      ===================================================== */}

      <section className="recent-applications-section">

        <div className="recent-header">

          <div>

            <span className="section-label">
              ACTIVITY
            </span>

            <h2>
              Recent Applications
            </h2>

          </div>

          <Link
            to="/owner/applications"
            className="view-all-link"
          >
            View All →
          </Link>

        </div>


        {/* ===================================================
            LOADING
        =================================================== */}

        {loading ? (

          <div className="empty-applications">

            Loading applications...

          </div>

        ) : applications.length === 0 ? (

          /* =================================================
             NO APPLICATIONS
          ================================================= */

          <div className="empty-applications">

            <div className="empty-icon">
              📄
            </div>

            <h3>
              No applications submitted yet.
            </h3>

            <p>
              Register an instrument to create your
              first verification application.
            </p>

            <Link
              to="/owner/instruments/add"
              className="empty-action-button"
            >
              Register Instrument
            </Link>

          </div>

        ) : (

          /* =================================================
             APPLICATION LIST
          ================================================= */

          <div className="applications-list">

            {applications
              .slice(0, 5)
              .map((application) => (

                <div
                  className="application-item"
                  key={
                    application.application_id ||
                    application.id
                  }
                >

                  <div className="application-info">

                    <strong>
                      {
                        application.application_number ||
                        application.applicationNumber ||
                        "Application"
                      }
                    </strong>

                    <span>
                      {
                        application.instrument_name ||
                        "Instrument"
                      }
                    </span>

                  </div>


                  <span
                    className={`application-status ${String(
                      application.status || "Pending"
                    ).toLowerCase()}`}
                  >
                    {
                      application.status ||
                      "Pending"
                    }
                  </span>

                </div>

              ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default OwnerDashboard;