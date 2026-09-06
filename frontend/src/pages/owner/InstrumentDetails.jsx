import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import instrumentService from "../../services/instrumentService";

function InstrumentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [instrument, setInstrument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadInstrument = async () => {
      try {
        setLoading(true);
        const response = await instrumentService.getById(id);
        setInstrument(response?.data?.data || null);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load instrument details");
      } finally {
        setLoading(false);
      }
    };

    loadInstrument();
  }, [id]);

  if (loading) {
    return <div className="page"><div className="page-header"><h1>Instrument Details</h1><p>Loading...</p></div></div>;
  }

  if (error || !instrument) {
    return <div className="page"><div className="page-header"><h1>Instrument Details</h1></div><div className="alert alert-error">{error || "Instrument not found"}</div></div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Instrument Details</h1>
        <p>Instrument ID: {id}</p>
      </div>

      <div className="details-card">
        <h2>
          {instrument.instrument_name}
        </h2>

        <p>
          <strong>Serial Number:</strong>{" "}
          {instrument.serial_number || "Not generated yet"}
        </p>

        <p>
          <strong>Manufacturer:</strong>{" "}
          {instrument.manufacturer || "Not provided"}
        </p>

        <p>
          <strong>Model:</strong>{" "}
          {instrument.model_number || "Not provided"}
        </p>

        <p>
          <strong>Capacity:</strong>{" "}
          {instrument.capacity || "Not provided"} {instrument.unit || ""}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          {instrument.location || instrument.installation_location || "Not provided"}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {instrument.status}
        </p>

        <Button
          onClick={() =>
            navigate("/owner/apply-verification")
          }
        >
          Apply for Verification
        </Button>
      </div>
    </div>
  );
}

export default InstrumentDetails;