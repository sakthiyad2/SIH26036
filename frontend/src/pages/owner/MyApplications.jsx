import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function MyApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const response = await api.get("/applications/my");
        setApplications(response?.data?.data || []);
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load applications");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1>My Applications</h1>
        <p>Track verification requests from submission through official decision.</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {loading ? <div className="empty-state">Loading applications...</div> : applications.length === 0 ? (
        <div className="empty-state">
          <p>No applications yet.</p>
          <button type="button" onClick={() => navigate("/owner/instruments/add")}>Add an instrument</button>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead><tr><th>Application</th><th>Instrument</th><th>Serial</th><th>Status</th><th>Inspection</th></tr></thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.application_id}>
                  <td>{application.application_number}</td>
                  <td>{application.instrument_name || "-"}</td>
                  <td>{application.serial_number || "-"}</td>
                  <td><span className={`status status-${String(application.status || "SUBMITTED").toLowerCase()}`}>{application.status || "SUBMITTED"}</span></td>
                  <td>{application.inspection_status || "Not scheduled"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyApplications;