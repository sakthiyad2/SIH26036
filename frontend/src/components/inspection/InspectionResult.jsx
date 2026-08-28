function InspectionResult({
  result,
}) {
  if (!result) {
    return (
      <div className="inspection-result">
        No inspection result available.
      </div>
    );
  }

  const passed =
    String(result.result).toUpperCase() ===
    "PASS";

  return (
    <div className="inspection-result">
      <h3>Inspection Result</h3>

      <div className="result-row">
        <span>Test</span>
        <strong>{result.test_name}</strong>
      </div>

      <div className="result-row">
        <span>Standard Value</span>
        <strong>
          {result.standard_value}
        </strong>
      </div>

      <div className="result-row">
        <span>Observed Value</span>
        <strong>
          {result.observed_value}
        </strong>
      </div>

      <div className="result-row">
        <span>Error</span>
        <strong>
          {result.error_value}
        </strong>
      </div>

      <div className="result-row">
        <span>Permissible Error</span>
        <strong>
          {result.permissible_error}
        </strong>
      </div>

      <div
        className={
          passed
            ? "result-success"
            : "result-failed"
        }
      >
        {passed
          ? "✓ PASSED"
          : "✕ FAILED"}
      </div>

      {result.remarks && (
        <p>
          <strong>Remarks:</strong>{" "}
          {result.remarks}
        </p>
      )}
    </div>
  );
}

export default InspectionResult;