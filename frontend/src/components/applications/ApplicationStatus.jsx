function ApplicationStatus({ status }) {
  const statusText = status || "SUBMITTED";

  return (
    <span
      className={`status status-${statusText.toLowerCase()}`}
    >
      {statusText.replaceAll("_", " ")}
    </span>
  );
}

export default ApplicationStatus;