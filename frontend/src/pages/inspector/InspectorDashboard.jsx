import {
  useEffect,
  useState
} from "react";

import StatCard
  from "../../components/dashboard/StatCard";

import RecentApplications
  from "../../components/dashboard/RecentApplications";

import inspectorService
  from "../../services/inspectorService";


function InspectorDashboard() {

  const [
    stats,
    setStats
  ] = useState({

    total_assigned: 0,

    scheduled: 0,

    completed: 0,

    pending: 0
  });


  const [
    applications,
    setApplications
  ] = useState([]);


  const [
    loading,
    setLoading
  ] = useState(true);


  // ==========================================================
  // LOAD DASHBOARD
  // ==========================================================

  useEffect(() => {

    loadDashboard();

  }, []);


  const loadDashboard =
    async () => {

      try {

        setLoading(true);


        const [
          dashboardResponse,
          applicationsResponse
        ] = await Promise.all([

          inspectorService
            .getDashboard(),

          inspectorService
            .getAssignedApplications()

        ]);


        if (
          dashboardResponse.data?.success
        ) {

          setStats(
            dashboardResponse.data.data
          );
        }


        if (
          applicationsResponse.data?.success
        ) {

          setApplications(
            applicationsResponse.data.data
              .slice(0, 5)
              .map(
                (item) => ({

                  id:
                    item.application_id,

                  application_number:
                    item.application_number,

                  instrument_name:
                    item.instrument_name,

                  status:
                    item.inspection_status ||
                    item.application_status

                })
              )
          );
        }


      } catch (error) {

        console.error(
          "Inspector dashboard error:",
          error
        );

      } finally {

        setLoading(false);
      }
    };


  // ==========================================================
  // UI
  // ==========================================================

  return (

    <div className="dashboard-page">

      <div className="page-header">

        <h1>
          Inspector Dashboard
        </h1>

        <p>
          Manage assigned verification inspections.
        </p>

      </div>


      <div className="stats-grid">

        <StatCard
          title="Assigned"
          value={
            stats.total_assigned || 0
          }
          icon="📋"
        />


        <StatCard
          title="Scheduled"
          value={
            stats.scheduled || 0
          }
          icon="📅"
        />


        <StatCard
          title="Completed"
          value={
            stats.completed || 0
          }
          icon="✓"
        />


        <StatCard
          title="Pending"
          value={
            stats.pending || 0
          }
          icon="⏳"
        />

      </div>


      {
        !loading && (

          <RecentApplications
            applications={
              applications
            }
          />

        )
      }

    </div>
  );
}


export default InspectorDashboard;