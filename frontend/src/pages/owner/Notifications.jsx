function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Application Approved",
      message:
        "Your verification application APP-2026-001 has been approved.",
      date: "2026-08-20",
    },
    {
      id: 2,
      title: "Inspection Scheduled",
      message:
        "Your instrument inspection is scheduled for 28-08-2026.",
      date: "2026-08-22",
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Notifications</h1>
      </div>

      <div className="notification-list">
        {notifications.map((notification) => (
          <div
            className="notification-item"
            key={notification.id}
          >
            <h3>{notification.title}</h3>

            <p>{notification.message}</p>

            <small>
              {notification.date}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;