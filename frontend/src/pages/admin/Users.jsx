function Users() {
  const users = [
    {
      id: 1,
      name: "Ravi Kumar",
      email: "ravi@example.com",
      role: "OWNER",
      status: "ACTIVE",
    },
    {
      id: 2,
      name: "Kumar",
      email: "kumar@example.com",
      role: "INSPECTOR",
      status: "ACTIVE",
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Users</h1>

        <p>
          Manage system users.
        </p>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;