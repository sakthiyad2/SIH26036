function StatCard({
  title,
  value,
  icon = "📊",
  description = "",
}) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon">
        {icon}
      </div>

      <div className="stat-card-content">
        <p>{title}</p>

        <h2>{value}</h2>

        {description && (
          <small>{description}</small>
        )}
      </div>
    </div>
  );
}

export default StatCard;