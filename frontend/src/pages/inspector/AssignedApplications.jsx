import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import ApplicationTable
  from "../../components/applications/ApplicationTable";

import inspectorService
  from "../../services/inspectorService";

import Alert
  from "../../components/common/Alert";


function AssignedApplications() {

  const navigate =
    useNavigate();


  const [
    applications,
    setApplications
  ] = useState([]);


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    error,
    setError
  ] = useState("");


  // ==========================================================
  // LOAD APPLICATIONS
  // ==========================================================

  useEffect(() => {

    loadApplications();

  }, []);


  const loadApplications =
    async () => {

      try {

        setLoading(true);

        setError("");


        const response =
          await inspectorService
            .getAssignedApplications();


        console.log(
          "Assigned applications:",
          response.data
        );


        if (
          response.data?.success
        ) {

          setApplications(
            response.data.data || []
          );

        } else {

          setError(
            response.data?.message ||
            "Failed to load applications."
          );
        }


      } catch (err) {

        console.error(
          "Applications error:",
          err
        );


        setError(
          err.response?.data?.message ||
          "Unable to load assigned applications."
        );

      } finally {

        setLoading(false);
      }
    };


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {

    return (

      <div className="page">

        <div className="page-header">

          <h1>
            Assigned Applications
          </h1>

          <p>
            Loading applications...
          </p>

        </div>

      </div>
    );
  }


  // ==========================================================
  // UI
  // ==========================================================

  return (

    <div className="page">

      <div className="page-header">

        <h1>
          Assigned Applications
        </h1>

        <p>
          Applications assigned to you for inspection.
        </p>

      </div>


      <Alert
        message={error}
        type="error"
        onClose={() =>
          setError("")
        }
      />


      {
        applications.length === 0 ? (

          <div className="empty-state">

            <h3>
              No Assigned Applications
            </h3>

            <p>
              There are currently no applications assigned to you.
            </p>

          </div>

        ) : (

          <ApplicationTable

            applications={
              applications
            }

            onView={
              (application) =>
                navigate(
                  `/inspector/applications/${application.application_id}`
                )
            }

          />

        )
      }

    </div>
  );
}


export default AssignedApplications;