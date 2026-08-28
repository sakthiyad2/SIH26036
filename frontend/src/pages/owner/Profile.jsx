import { useEffect, useState } from "react";
import Alert from "../../components/common/Alert";
import api from "../../services/api";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await api.get("/owners/profile");
        setProfile(response.data?.data || null);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
          "Unable to load your profile."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return (
    <div className="page owner-profile-page">
      <div className="page-header">
        <div>
          <h1>My Profile</h1>
          <p>Your account and business information.</p>
        </div>
      </div>

      {loading && <div className="profile-panel">Loading profile...</div>}
      {!loading && error && <Alert message={error} type="error" />}

      {!loading && profile && (
        <section className="profile-panel">
          <div className="profile-avatar">
            {(profile.full_name || "U").charAt(0).toUpperCase()}
          </div>

          <div className="profile-details">
            <h2>{profile.full_name}</h2>
            <p className="profile-role">{profile.role}</p>

            <div className="profile-fields">
              <div>
                <span>Email</span>
                <strong>{profile.email || "-"}</strong>
              </div>
              <div>
                <span>Phone</span>
                <strong>{profile.phone || "-"}</strong>
              </div>
              <div>
                <span>Business</span>
                <strong>{profile.business_name || "-"}</strong>
              </div>
              <div>
                <span>Business Type</span>
                <strong>{profile.business_type || "-"}</strong>
              </div>
              <div className="profile-field-wide">
                <span>Address</span>
                <strong>
                  {[profile.address_line1, profile.address_line2,
                    profile.city, profile.state, profile.pincode]
                    .filter(Boolean)
                    .join(", ") || profile.address || "-"}
                </strong>
              </div>
              <div>
                <span>Account Status</span>
                <strong>{profile.status || "-"}</strong>
              </div>
            </div>
          </div>
        </section>
      )}
      </div>
  );
}

export default Profile;