function AuditLogs() {
  const logs = [
    {
      id: 1,
      user: "Admin",
      action: "APPROVED_APPLICATION",
      record: "APP-2026-001",
      date: "2026-08-20",
    },
    {
      id: 2,
      user: "Inspector",
      action: "COMPLETED_INSPECTION",
      record: "APP-2026-002",
      date: "2026-08-21",
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Audit Logs</h1>

        <p>
          Track important system activities.
        </p>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Record</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.user}</td>
                <td>{log.action}</td>
                <td>{log.record}</td>
                <td>{log.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AuditLogs;