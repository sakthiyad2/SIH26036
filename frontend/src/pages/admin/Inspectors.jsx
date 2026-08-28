function Inspectors() {
  const inspectors = [
    {
      id: 1,
      name: "Kumar",
      employeeCode: "INS-001",
      district: "Chennai",
      status: "ACTIVE",
    },
    {
      id: 2,
      name: "Arun",
      employeeCode: "INS-002",
      district: "Coimbatore",
      status: "ACTIVE",
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Inspectors</h1>

        <p>
          Manage verification inspectors.
        </p>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Employee Code</th>
              <th>District</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {inspectors.map((inspector) => (
              <tr key={inspector.id}>
                <td>{inspector.name}</td>
                <td>
                  {inspector.employeeCode}
                </td>
                <td>{inspector.district}</td>
                <td>{inspector.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inspectors;