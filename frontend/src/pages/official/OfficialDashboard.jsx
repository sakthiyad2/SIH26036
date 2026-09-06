import { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import applicationService from "../../services/applicationService";
import userService from "../../services/userService";
import certificateService from "../../services/certificateService";
import "./OfficialDashboard.css";

function OfficialDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [inspectors, setInspectors] = useState([]);
  const [assignmentTargetId, setAssignmentTargetId] = useState(null);
  const [selectedInspectorId, setSelectedInspectorId] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
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

  const loadInspectors = useCallback(async () => {
    try {
      const response = await userService.getInspectors();
      const inspectorList = response?.data?.data || [];
      setInspectors(inspectorList);

      if (inspectorList.length > 0 && !selectedInspectorId) {
        setSelectedInspectorId(String(inspectorList[0].inspector_id));
      }
    } catch (err) {
      console.error("Unable to load inspectors", err);
      setInspectors([]);
    }
  }, [selectedInspectorId]);

  useEffect(() => {
    loadSubmissions();
    loadInspectors();
  }, [loadInspectors]);

  const beginAssignment = (application) => {
    if (!inspectors.length) {
      setError("No active inspectors are available for assignment.");
      return;
    }

    const today = new Date();
    const formattedToday = today.toISOString().slice(0, 10);

    setAssignmentTargetId(application.application_id);
    setSelectedInspectorId(String(inspectors[0].inspector_id));
    setScheduledDate(formattedToday);
    setError("");
  };

  const assignInspector = async (application) => {
    try {
      if (!scheduledDate) {
        setError("Please select an inspection date.");
        return;
      }

      const numericInspectorId = Number(selectedInspectorId);

      if (!Number.isInteger(numericInspectorId) || numericInspectorId <= 0) {
        throw new Error("Please select a valid inspector.");
      }

      await applicationService.assignInspector(
        application.application_id,
        {
          inspector_id: numericInspectorId,
          scheduled_date: scheduledDate,
          inspection_location: application.location || application.installation_location || application.city || application.state || "Official site"
        }
      );

      setAssignmentTargetId(null);
      setSelectedInspectorId("");
      await loadSubmissions();
      setError("");
    } catch (err) {
      const serverMessage = err?.response?.data?.message || err?.message || "Unable to update status";
      setError(serverMessage);
    }
  };

  const reviewApplication = async (application, decision) => {
    try {
      await applicationService.updateStatus(
        application.application_id,
        decision
      );
      await loadSubmissions();
      setError("");
    } catch (err) {
      const serverMessage = err?.response?.data?.message || err?.message || "Unable to review application";
      setError(serverMessage);
    }
  };

  const issueCertificate = async (application) => {
    try {
      const issuedDate = new Date();
      const validUntil = new Date(issuedDate);
      validUntil.setFullYear(validUntil.getFullYear() + 1);

      await certificateService.create({
        application_id: application.application_id,
        instrument_id: application.instrument_id,
        issued_date: issuedDate.toISOString().slice(0, 10),
        valid_until: validUntil.toISOString().slice(0, 10),
        status: "VALID"
      });

      await loadSubmissions();
      setError("");
    } catch (err) {
      const serverMessage = err?.response?.data?.message || err?.message || "Unable to issue certificate";
      setError(serverMessage);
    }
  };

  const totalPending = submissions.filter((item) => String(item.status || "SUBMITTED").toUpperCase() === "SUBMITTED").length;
  const totalAssigned = submissions.filter((item) => ["ASSIGNED", "SCHEDULED", "IN_PROGRESS"].includes(String(item.status || "").toUpperCase())).length;
  const totalApproved = submissions.filter((item) => String(item.status || "").toUpperCase() === "APPROVED").length;

  const safeOwnerName = (item) => item.owner_name || item.business_name || item.full_name || "Owner";
  const safeSerialNumber = (item) => item.serial_number || item.instrument_serial_number || item.serial || "-";

  return (
    <div className="dashboard-page official-dashboard">
      <div className="page-header">
        <div>
          <h1>Government Official Dashboard</h1>
          <p>Review submitted instruments, assign inspectors, and manage verification requests.</p>
        </div>
      </div>

      <div className="official-summary-grid">
        <div className="official-stat-card">
          <span>Total Requests</span>
          <strong>{submissions.length}</strong>
        </div>
        <div className="official-stat-card warning">
          <span>Pending</span>
          <strong>{totalPending}</strong>
        </div>
        <div className="official-stat-card info">
          <span>Assigned</span>
          <strong>{totalAssigned}</strong>
        </div>
        <div className="official-stat-card success">
          <span>Approved</span>
          <strong>{totalApproved}</strong>
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
        <div className="table-wrapper official-table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Application</th>
                <th>Owner</th>
                <th>Instrument</th>
                <th>Serial #</th>
                <th>Location</th>
                <th>Submission</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((item) => (
                <tr key={item.application_id}>
                  <td>{item.application_number || "-"}</td>
                  <td>{safeOwnerName(item)}</td>
                  <td>{item.instrument_name || "-"}</td>
                  <td>{safeSerialNumber(item)}</td>
                  <td>{item.location || item.location_address || item.installation_location || item.city || item.state || "-"}</td>
                  <td>
                    {item.status === "INSPECTION_COMPLETED" ? (
                      <div className="submission-summary">
                        <strong>{item.result_status || "Inspection Submitted"}</strong>
                        <small>{item.inspector_comments || item.measurement_test_result || "Inspector report is available."}</small>
                      </div>
                    ) : (
                      <span className="muted-text">Waiting for inspection</span>
                    )}
                  </td>
                  <td>
                    <span className={`status status-${String(item.status || "SUBMITTED").toLowerCase()}`}>
                      {item.status || "SUBMITTED"}
                    </span>
                  </td>
                  <td>
                    {assignmentTargetId === item.application_id ? (
                      <div className="assignment-picker">
                        <select
                          value={selectedInspectorId}
                          onChange={(event) => setSelectedInspectorId(event.target.value)}
                        >
                          {inspectors.length === 0 ? (
                            <option value="">No inspectors available</option>
                          ) : (
                            inspectors.map((inspector) => (
                              <option key={inspector.inspector_id} value={inspector.inspector_id}>
                                {inspector.full_name} ({inspector.employee_id || inspector.inspector_id})
                              </option>
                            ))
                          )}
                        </select>
                        <input
                          type="date"
                          value={scheduledDate}
                          onChange={(event) => setScheduledDate(event.target.value)}
                          aria-label="Inspection date"
                        />
                        <div className="assignment-picker-actions">
                          <button
                            type="button"
                            className="dashboard-cta"
                            onClick={() => assignInspector(item)}
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            className="dashboard-cta secondary"
                            onClick={() => {
                              setAssignmentTargetId(null);
                              setScheduledDate("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="row-actions">
                        {item.status === "SUBMITTED" && (
                          <button type="button" className="dashboard-cta secondary" onClick={() => beginAssignment(item)}>
                            Assign
                          </button>
                        )}
                        {item.status === "INSPECTION_COMPLETED" && (
                          <>
                            <button type="button" className="dashboard-cta" onClick={() => reviewApplication(item, "APPROVED")}>
                              Approve
                            </button>
                            <button type="button" className="dashboard-cta danger" onClick={() => reviewApplication(item, "REJECTED")}>
                              Reject
                            </button>
                          </>
                        )}
                        {item.status === "APPROVED" && (
                          <button type="button" className="dashboard-cta" onClick={() => issueCertificate(item)}>
                            Issue Certificate
                          </button>
                        )}
                      </div>
                    )}
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
