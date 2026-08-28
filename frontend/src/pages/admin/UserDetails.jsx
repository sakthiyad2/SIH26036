import { useParams } from "react-router-dom";

function UserDetails() {
  const { id } = useParams();

  return (
    <div className="page">
      <div className="page-header">
        <h1>User Details</h1>

        <p>User ID: {id}</p>
      </div>

      <div className="details-card">
        <h2>Ravi Kumar</h2>

        <p>
          <strong>Email:</strong>{" "}
          ravi@example.com
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          +91 9876543210
        </p>

        <p>
          <strong>Role:</strong> OWNER
        </p>

        <p>
          <strong>Status:</strong> ACTIVE
        </p>
      </div>
    </div>
  );
}

export default UserDetails;