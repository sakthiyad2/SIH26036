import { useEffect, useState } from "react";
import api from "../../services/api";
import applicationService from "../../services/applicationService";

function OfficialDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const response = await api.get("/applications");
      setSubmissions(response?.data?.data || []);
      setError("");
    } catch (err) {
      setError(err.message || "Unable to load submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const assignInspector = async (application) => {
    try {
      const inspectorId = window.prompt(
        "Enter the inspector ID to assign:"
      );
      const scheduledDate = window.prompt(
        "Enter inspection date (YYYY-MM-DD):"
      );

      if (!inspectorId || !scheduledDate) {
        return;
      }

      await applicationService.assignInspector(
        application.application_id,
        {
          inspector_id: Number(inspectorId),
          scheduled_date: scheduledDate,
          inspection_location: application.location
        }
      );
      await loadSubmissions();
    } catch (err) {
      setError(err.message || "Unable to update status");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Government Official Dashboard</h1>
          <p>Review submitted instruments and update approval status.</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="empty-state">
          <p>Loading submissions...</p>
        </div>
      ) : submissions.length === 0 ? (
        <div className="empty-state">
          <p>No instrument submissions yet.</p>
          <small>Submitted instruments will appear here.</small>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Application</th>
                <th>Instrument</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((item) => (
                <tr key={item.application_id}>
                  <td>
                    {item.application_number || "-"}
                  </td>
                  <td>{item.instrument_name || "-"}</td>
                  <td>{item.location || "-"}</td>
                  <td>
                    <span className={`status status-${String(item.status || "SUBMITTED").toLowerCase()}`}>
                      {item.status || "SUBMITTED"}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        type="button"
                        className="dashboard-cta secondary"
                        onClick={() => assignInspector(item)}
                      >
                        Assign Inspector
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OfficialDashboard;
