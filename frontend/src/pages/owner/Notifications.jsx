import { useEffect, useState } from "react";
import api from "../../services/api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const response = await api.get("/notifications");

        if (response.data?.success) {
          setNotifications(response.data.data || []);
        }
      } catch (error) {
        console.error("Notification error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Notifications</h1>
      </div>

      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <div className="empty-state">
          <h3>No Notifications</h3>
          <p>You don't have any notifications right now.</p>
        </div>
      ) : (
        <div className="notification-list">
          {notifications.map((notification) => (
            <div
              className="notification-item"
              key={notification.notification_id}
            >
              <h3>{notification.title}</h3>
              <p>{notification.message}</p>
              <small>{new Date(notification.created_at).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifications;