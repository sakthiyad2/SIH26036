import { useState } from "react";
import InstrumentTable from "../../components/instruments/InstrumentTable";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";

function MyInstruments() {
  const navigate = useNavigate();

  const [instruments] = useState([
    {
      instrument_id: 1,
      instrument_name:
        "Electronic Weighing Scale",
      serial_number: "EWS-1001",
      manufacturer: "ABC Instruments",
      model_number: "ABC-500",
      status: "VERIFIED",
    },
    {
      instrument_id: 2,
      instrument_name: "Platform Scale",
      serial_number: "PS-2002",
      manufacturer: "XYZ Ltd",
      model_number: "XYZ-200",
      status: "PENDING_VERIFICATION",
    },
  ]);

  return (
    <div className="page">
      <div className="page-header page-header-actions">
        <div>
          <h1>My Instruments</h1>
          <p>
            Manage your registered weighing and
            measuring instruments.
          </p>
        </div>

        <Button
          onClick={() =>
            navigate("/owner/instruments/add")
          }
        >
          + Add Instrument
        </Button>
      </div>

      <InstrumentTable
        instruments={instruments}
        onView={(instrument) =>
          navigate(
            `/owner/instruments/${instrument.instrument_id}`
          )
        }
      />
    </div>
  );
}

export default MyInstruments;