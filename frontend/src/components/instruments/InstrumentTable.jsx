function InstrumentTable({
  instruments = [],
  onView,
  onEdit,
}) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Instrument</th>
            <th>Serial Number</th>
            <th>Manufacturer</th>
            <th>Model</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {instruments.length === 0 ? (
            <tr>
              <td colSpan="6">
                No instruments found.
              </td>
            </tr>
          ) : (
            instruments.map((instrument) => (
              <tr
                key={
                  instrument.instrument_id ||
                  instrument.id
                }
              >
                <td>
                  {instrument.instrument_name ||
                    instrument.instrumentName}
                </td>

                <td>
                  {instrument.serial_number ||
                    instrument.serialNumber}
                </td>

                <td>
                  {instrument.manufacturer || "N/A"}
                </td>

                <td>
                  {instrument.model_number ||
                    instrument.modelNumber ||
                    "N/A"}
                </td>

                <td>
                  <span
                    className={`status status-${String(
                      instrument.status || "active"
                    ).toLowerCase()}`}
                  >
                    {instrument.status || "Active"}
                  </span>
                </td>

                <td>
                  {onView && (
                    <button
                      type="button"
                      onClick={() =>
                        onView(instrument)
                      }
                    >
                      View
                    </button>
                  )}

                  {onEdit && (
                    <button
                      type="button"
                      onClick={() =>
                        onEdit(instrument)
                      }
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InstrumentTable;