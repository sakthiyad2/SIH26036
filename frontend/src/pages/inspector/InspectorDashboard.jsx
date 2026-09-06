import {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

import StatCard
  from "../../components/dashboard/StatCard";

import RecentApplications
  from "../../components/dashboard/RecentApplications";

import api from "../../services/api";

import inspectorService
  from "../../services/inspectorService";


function InspectorDashboard() {
  const navigate = useNavigate();

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
    notifications,
    setNotifications
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
          applicationsResponse,
          notificationsResponse
        ] = await Promise.all([

          inspectorService
            .getDashboard(),

          inspectorService
            .getAssignedApplications(),

          api.get("/notifications")

        ]);


        if (
          dashboardResponse.data?.success
        ) {
          const dashboardData =
            dashboardResponse.data.data || {};

          setStats({
            total_assigned:
              Number(
                dashboardData.assigned ??
                dashboardData.total_assigned ??
                0
              ),
            scheduled:
              Number(
                dashboardData.scheduled ?? 0
              ),
            completed:
              Number(
                dashboardData.completed ?? 0
              ),
            pending:
              Number(
                dashboardData.pending ?? 0
              )
          });
        }


        if (
          applicationsResponse.data?.success
        ) {

          setApplications(
            (applicationsResponse.data.data || [])
              .slice(0, 5)
              .map(
                (item) => ({

                  id:
                    item.application_id,

                  application_number:
                    item.application_number,

                  instrument_name:
                    item.instrument_name,
                  serial_number:
                    item.serial_number || "-",
                  location:
                    item.installation_location ||
                    item.inspection_location ||
                    item.location ||
                    "-",
                  status:
                    item.inspection_status ||
                    item.application_status ||
                    "PENDING"

                })
              )
          );
        }

        if (notificationsResponse?.data?.success) {
          setNotifications(
            notificationsResponse.data.data || []
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

    <div className="dashboard-page inspector-dashboard">

      <div className="page-header">

        <h1>
          Inspector Dashboard
        </h1>

        <p>
          Manage assigned verification inspections and review inspection alerts.
        </p>

      </div>


      <div className="inspector-summary-grid">

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


      {!loading && (
        <div className="inspector-dashboard-grid">
          <div className="inspector-panel">
            <RecentApplications
              applications={applications}
              onView={(application) =>
                navigate(
                  `/inspector/applications/${application.id || application.application_id}`
                )
              }
            />
          </div>

          <div className="inspector-panel">
            <div className="panel-header">
              <h3>Inspection Notifications</h3>
              <span>{notifications.length}</span>
            </div>

            {notifications.length === 0 ? (
              <div className="empty-state compact">
                <p>No inspection notifications yet.</p>
              </div>
            ) : (
              <div className="notification-list compact-list">
                {notifications.slice(0, 5).map((item) => (
                  <div className="notification-item" key={item.notification_id || item.id}>
                    <h4>{item.title}</h4>
                    <p>{item.message}</p>
                    <small>{item.created_at || "Just now"}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}


export default InspectorDashboard;