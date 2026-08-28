import {
  useCallback,
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import InspectionForm
  from "../../components/inspection/InspectionForm";

import Alert
  from "../../components/common/Alert";

import inspectorService
  from "../../services/inspectorService";


function ConductInspection() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [application, setApplication] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);


  // ==========================================================
  // LOAD APPLICATION
  // ==========================================================

  const loadApplication =
    useCallback(
      async () => {

        try {

          setLoading(true);

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
            "Unable to load application"
          );

        } finally {

          setLoading(false);
        }
      },
      [id]
    );

  useEffect(() => {

    loadApplication();

  }, [loadApplication]);


  // ==========================================================
  // SUBMIT INSPECTION
  // ==========================================================

  const handleSubmit =
    async (data) => {

      try {

        setSubmitting(true);
        setError("");

        await inspectorService
          .completeInspection(
            id,
            data
          );

        alert(
          "Inspection submitted successfully."
        );

        navigate(
          "/inspector/history"
        );

      } catch (error) {

        console.error(
          "Inspection submission error:",
          error
        );

        setError(
          error.response?.data?.message ||
          error.message ||
          "Failed to submit inspection"
        );

      } finally {

        setSubmitting(false);
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
            Conduct Inspection
          </h1>

          <p>
            Loading inspection...
          </p>

        </div>

      </div>
    );
  }


  if (!application) {

    return (
      <div className="page">

        <Alert
          message={
            error ||
            "Inspection not found"
          }
          type="error"
        />

      </div>
    );
  }


  // ==========================================================
  // PAGE
  // ==========================================================

  return (

    <div className="page">

      <div className="page-header">

        <h1>
          Conduct Inspection
        </h1>

        <p>
          Application:{" "}
          {application.application_number}
        </p>

      </div>


      <Alert
        message={error}
        type="error"
        onClose={() => setError("")}
      />


      <div className="inspection-info-card">

        <h2>
          {application.instrument_name}
        </h2>

        <p>
          <strong>
            Serial Number:
          </strong>{" "}
          {application.serial_number}
        </p>

        <p>
          <strong>
            Owner:
          </strong>{" "}
          {application.business_name}
        </p>

        <p>
          <strong>
            Location:
          </strong>{" "}
          {application.location ||
            application.inspection_location ||
            "-"}
        </p>

      </div>


      <div className="form-card">

        <InspectionForm
          onSubmit={handleSubmit}
          disabled={submitting}
        />

      </div>

    </div>
  );
}


export default ConductInspection;