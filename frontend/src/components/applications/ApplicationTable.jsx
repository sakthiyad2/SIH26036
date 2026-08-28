function ApplicationCard({
  application,
  onView,
}) {
  return (
    <div className="application-card">
      <div className="application-card-header">
        <div>
          <h3>
            {application.application_number ||
              application.applicationNumber ||
              "Application"}
          </h3>

          <p>
            {application.instrument_name ||
              application.instrumentName ||
              "Instrument"}
          </p>
        </div>

        <span
          className={`status status-${String(
            application.status || "submitted"
          ).toLowerCase()}`}
        >
          {application.status || "Submitted"}
        </span>
      </div>

      <div className="application-details">
        <p>
          <strong>Application Type:</strong>{" "}
          {application.application_type ||
            application.applicationType ||
            "Verification"}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {application.application_date ||
            application.applicationDate ||
            "N/A"}
        </p>

        <p>
          <strong>Inspector:</strong>{" "}
          {application.inspector_name ||
            application.inspectorName ||
            "Not assigned"}
        </p>
      </div>

      {onView && (
        <button
          type="button"
          onClick={() => onView(application)}
        >
          View Application
        </button>
      )}
    </div>
  );
}

export default ApplicationCard;