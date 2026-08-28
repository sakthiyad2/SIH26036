function InstrumentCard({
  instrument,
  onView,
  onEdit,
}) {
  return (
    <div className="instrument-card">
      <div className="instrument-card-header">
        <span className="instrument-icon">
          ⚖️
        </span>

        <span
          className={`status status-${String(
            instrument.status || "active"
          ).toLowerCase()}`}
        >
          {instrument.status || "Active"}
        </span>
      </div>

      <h3>
        {instrument.instrument_name ||
          instrument.instrumentName ||
          "Instrument"}
      </h3>

      <div className="instrument-details">
        <p>
          <strong>Serial No:</strong>{" "}
          {instrument.serial_number ||
            instrument.serialNumber ||
            "N/A"}
        </p>

        <p>
          <strong>Manufacturer:</strong>{" "}
          {instrument.manufacturer || "N/A"}
        </p>

        <p>
          <strong>Model:</strong>{" "}
          {instrument.model_number ||
            instrument.modelNumber ||
            "N/A"}
        </p>

        <p>
          <strong>Capacity:</strong>{" "}
          {instrument.capacity || "N/A"}{" "}
          {instrument.unit || ""}
        </p>
      </div>

      <div className="instrument-actions">
        {onView && (
          <button
            type="button"
            onClick={() => onView(instrument)}
          >
            View
          </button>
        )}

        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit(instrument)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default InstrumentCard;