import Chart from "../../components/dashboard/Chart";

function Reports() {
  const data = [
    {
      label: "January",
      value: 70,
    },
    {
      label: "February",
      value: 85,
    },
    {
      label: "March",
      value: 60,
    },
    {
      label: "April",
      value: 90,
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Reports</h1>

        <p>
          Verification system statistics and
          reports.
        </p>
      </div>

      <Chart
        title="Monthly Applications"
        data={data}
      />
    </div>
  );
}

export default Reports;