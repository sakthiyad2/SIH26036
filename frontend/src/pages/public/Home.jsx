import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">
            SIH26036
          </span>

          <h1>
            Online Verification System
            <br />
            for Weighing & Measuring Instruments
          </h1>

          <p>
            A digital platform for online
            registration, verification, inspection,
            and certificate validation of weighing
            and measuring instruments.
          </p>

          <div className="hero-buttons">
            <Link
              to="/verify-certificate"
              className="primary-btn"
            >
              Verify Certificate
            </Link>

            <Link
              to="/register"
              className="secondary-btn"
            >
              Register
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Our Services</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <span>📝</span>
            <h3>Online Application</h3>
            <p>
              Submit verification applications
              online.
            </p>
          </div>

          <div className="feature-card">
            <span>🔍</span>
            <h3>Digital Inspection</h3>
            <p>
              Inspectors can record verification
              results digitally.
            </p>
          </div>

          <div className="feature-card">
            <span>📜</span>
            <h3>Digital Certificate</h3>
            <p>
              Receive and manage verification
              certificates.
            </p>
          </div>

          <div className="feature-card">
            <span>✓</span>
            <h3>Certificate Verification</h3>
            <p>
              Verify certificate authenticity
              online.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;