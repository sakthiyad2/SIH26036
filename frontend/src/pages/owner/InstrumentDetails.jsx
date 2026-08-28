import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/common/Button";

function InstrumentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const instrument = {
    instrument_name:
      "Electronic Weighing Scale",
    serial_number: "EWS-1001",
    manufacturer: "ABC Instruments",
    model_number: "ABC-500",
    capacity: "500",
    unit: "kg",
    location: "Chennai",
    status: "VERIFIED",
  };

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
          {instrument.serial_number}
        </p>

        <p>
          <strong>Manufacturer:</strong>{" "}
          {instrument.manufacturer}
        </p>

        <p>
          <strong>Model:</strong>{" "}
          {instrument.model_number}
        </p>

        <p>
          <strong>Capacity:</strong>{" "}
          {instrument.capacity} {instrument.unit}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          {instrument.location}
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