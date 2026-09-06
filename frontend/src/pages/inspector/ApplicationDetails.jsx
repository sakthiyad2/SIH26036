import {
  useCallback,
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import Button
  from "../../components/common/Button";

import ApplicationStatus
  from "../../components/applications/ApplicationStatus";

import inspectorService
  from "../../services/inspectorService";

import Alert
  from "../../components/common/Alert";


function ApplicationDetails() {

  const {
    id
  } = useParams();

  const navigate =
    useNavigate();


  const [
    application,
    setApplication
  ] = useState(null);


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    error,
    setError
  ] = useState("");

  const [
    starting,
    setStarting
  ] = useState(false);

  const acceptInspection = async () => {
    if (!application?.inspection_id) {
      setError("This application has no assigned inspection.");
      return;
    }

    try {
      setStarting(true);
      setError("");
      if (application.inspection_status !== "IN_PROGRESS") {
        await inspectorService.startInspection(application.inspection_id);
      }
      navigate(`/inspector/inspection/${application.application_id}`);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to accept inspection");
    } finally {
      setStarting(false);
    }
  };


  // ==========================================================
  // LOAD DETAILS
  // ==========================================================

  const loadDetails =
    useCallback(
      async () => {

        try {

          setLoading(true);

          setError("");


          const response =
            await inspectorService
              .getApplicationDetails(id);

          const result =
            response.data;

          setApplication(
            result.data || result
          );

        } catch (requestError) {

          setError(
            requestError.response?.data?.message ||
            requestError.message ||
            "Unable to load application details"
          );

        } finally {

          setLoading(false);
        }
      },
      [id]
    );

  useEffect(() => {

    loadDetails();

  }, [loadDetails]);


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {

    return (

      <div className="page">

        <div className="page-header">

          <h1>
            Application Details
          </h1>

          <p>
            Loading...
          </p>

        </div>

      </div>
    );
  }


  // ==========================================================
  // ERROR
  // ==========================================================

  if (
    error ||
    !application
  ) {

    return (

      <div className="page">

        <div className="page-header">

          <h1>
            Application Details
          </h1>

        </div>


        <Alert
          message={
            error ||
            "Application not found."
          }
          type="error"
        />


        <Button
          onClick={() =>
            navigate(
              "/inspector/applications"
            )
          }
        >
          Back to Applications
        </Button>

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
          Application Details
        </h1>

        <p>
          Application ID: {id}
        </p>

      </div>


      <div className="details-card">

        <h2>
          {
            application.application_number
          }
        </h2>


        <p>

          <strong>
            Instrument:
          </strong>{" "}

          {
            application.instrument_name
          }

        </p>


        <p>

          <strong>
            Serial Number:
          </strong>{" "}

          {
            application.serial_number
          }

        </p>


        <p>

          <strong>
            Manufacturer:
          </strong>{" "}

          {
            application.manufacturer ||
            "Not provided"
          }

        </p>


        <p>

          <strong>
            Model Number:
          </strong>{" "}

          {
            application.model_number ||
            "Not provided"
          }

        </p>


        <p>

          <strong>
            Capacity:
          </strong>{" "}

          {
            application.capacity ||
            "Not provided"
          }{" "}

          {
            application.unit || ""
          }

        </p>


        <p>

          <strong>
            Owner:
          </strong>{" "}

          {
            application.business_name ||
            "Not provided"
          }

        </p>


        <p>

          <strong>
            Owner City:
          </strong>{" "}

          {
            application.owner_city ||
            "Not provided"
          }

        </p>


        <p>

          <strong>
            Location:
          </strong>{" "}

          {
            application.location ||
            application.inspection_location ||
            "Not provided"
          }

        </p>


        <p>

          <strong>
            Application Date:
          </strong>{" "}

          {
            application.application_date ||
            "Not provided"
          }

        </p>


        <p>

          <strong>
            Inspection Date:
          </strong>{" "}

          {
            application.scheduled_date ||
            "Not scheduled"
          }

        </p>


        <p>

          <strong>
            Inspection Time:
          </strong>{" "}

          {
            application.scheduled_time ||
            "Not scheduled"
          }

        </p>


        <p>

          <strong>
            Status:
          </strong>{" "}

          <ApplicationStatus
            status={
              application.application_status ||
              application.inspection_status
            }
          />

        </p>


        {
          application.application_remarks && (

            <p>

              <strong>
                Remarks:
              </strong>{" "}

              {
                application.application_remarks
              }

            </p>

          )
        }


        <div className="details-actions">

          <Button

            onClick={acceptInspection}
            disabled={starting}

          >
            {starting ? "Accepting..." : "Accept & Start Inspection"}
          </Button>


          <Button

            type="button"

            onClick={() =>
              navigate(
                "/inspector/applications"
              )
            }

          >
            Back
          </Button>

        </div>

      </div>

    </div>
  );
}


export default ApplicationDetails;