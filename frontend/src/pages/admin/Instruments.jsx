import InstrumentTable from "../../components/instruments/InstrumentTable";

function Instruments() {
  const instruments = [
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
      serial_number: "PS-2001",
      manufacturer: "XYZ Ltd",
      model_number: "XYZ-200",
      status: "PENDING_VERIFICATION",
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Instruments</h1>

        <p>
          Manage registered instruments.
        </p>
      </div>

      <InstrumentTable
        instruments={instruments}
      />
    </div>
  );
}

export default Instruments;