import useAuth from "../../hooks/useAuth";
import "./Profile.css";

function Profile() {
  const { user } = useAuth();
  const displayName = user?.full_name || user?.name || "Government Official";

  return (
    <div className="page official-profile-page">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>View your government official account information.</p>
      </div>

      <section className="profile-panel">
        <div className="profile-avatar">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <div className="profile-details">
          <h2>{displayName}</h2>
          <p className="profile-role">Government Official</p>
          <div className="profile-fields">
            <div>
              <span>Email</span>
              <strong>{user?.email || "-"}</strong>
            </div>
            <div>
              <span>Phone</span>
              <strong>{user?.phone || "-"}</strong>
            </div>
            <div>
              <span>Department</span>
              <strong>{user?.department || "Legal Metrology"}</strong>
            </div>
            <div>
              <span>Account Status</span>
              <strong>{user?.status || "ACTIVE"}</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
