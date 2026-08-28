function RecentApplications({
  applications = [],
  onView,
}) {
  return (
    <div className="recent-applications">
      <div className="section-header">
        <h3>Recent Applications</h3>
      </div>

      {applications.length === 0 ? (
        <div className="empty-state">
          <p>No recent applications yet.</p>
          <small>
            User data will appear here after an application is submitted.
          </small>

          <button
            type="button"
            className="dashboard-cta secondary"
            onClick={() => window.location.assign("/owner/instruments/add")}
          >
            + Add Instrument
          </button>
        </div>
      ) : (
        <div className="application-list">
          {applications.map((application) => (
            <div
              className="recent-application-item"
              key={application.id || application.application_id}
            >
              <div>
                <strong>
                  {application.application_number ||
                    application.applicationNumber ||
                    "Application"}
                </strong>

                <p>
                  {application.instrument_name ||
                    application.instrumentName ||
                    "Instrument"}
                </p>
              </div>

              <div className="recent-application-right">
                <span
                  className={`status status-${String(
                    application.status || "pending"
                  ).toLowerCase()}`}
                >
                  {application.status || "Pending"}
                </span>

                {onView && (
                  <button
                    type="button"
                    onClick={() => onView(application)}
                  >
                    View
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentApplications;