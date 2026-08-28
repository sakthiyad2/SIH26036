import ApplicationTable from "../../components/applications/ApplicationTable";

function Applications() {
  const applications = [
    {
      application_id: 1,
      application_number: "APP-2026-001",
      instrument_name:
        "Electronic Weighing Scale",
      application_type: "NEW",
      application_date: "2026-08-10",
      inspector_name: "Kumar",
      status: "APPROVED",
    },
    {
      application_id: 2,
      application_number: "APP-2026-002",
      instrument_name: "Platform Scale",
      application_type: "RENEWAL",
      application_date: "2026-08-20",
      inspector_name: "Not Assigned",
      status: "SUBMITTED",
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Applications</h1>

        <p>
          Monitor all verification applications.
        </p>
      </div>

      <ApplicationTable
        applications={applications}
      />
    </div>
  );
}

export default Applications;