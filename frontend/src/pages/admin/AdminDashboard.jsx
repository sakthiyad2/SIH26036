import StatCard from "../../components/dashboard/StatCard";
import Chart from "../../components/dashboard/Chart";

function AdminDashboard() {
  const data = [
    { label: "Approved", value: 85 },
    { label: "Pending", value: 50 },
    { label: "Rejected", value: 20 },
    { label: "Expired", value: 30 },
  ];

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Admin Dashboard</h1>

        <p>
          Monitor the complete verification
          system.
        </p>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Users"
          value="1,250"
          icon="👥"
        />

        <StatCard
          title="Instruments"
          value="2,840"
          icon="⚖️"
        />

        <StatCard
          title="Applications"
          value="1,560"
          icon="📋"
        />

        <StatCard
          title="Certificates"
          value="1,120"
          icon="📜"
        />
      </div>

      <Chart
        title="Verification Statistics"
        data={data}
      />
    </div>
  );
}

export default AdminDashboard;