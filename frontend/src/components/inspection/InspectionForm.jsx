import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

function InspectionForm({
  initialData = {},
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    inspection_date:
      initialData.inspection_date || "",
    location:
      initialData.location || "",
    condition_status:
      initialData.condition_status || "GOOD",
    inspection_status:
      initialData.inspection_status || "PASSED",
    observed_capacity:
      initialData.observed_capacity || "",
    observed_accuracy:
      initialData.observed_accuracy || "",
    calibration_status:
      initialData.calibration_status || "OK",
    seal_condition:
      initialData.seal_condition || "GOOD",
    compliance_status:
      initialData.compliance_status || "COMPLIANT",
    observations:
      initialData.observations || "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form
      className="inspection-form"
      onSubmit={handleSubmit}
    >
      <div className="inspection-form-grid">
        <Input
          label="Inspection Date"
          name="inspection_date"
          type="date"
          value={formData.inspection_date}
          onChange={handleChange}
          required
        />

        <Input
          label="Inspection Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter location"
          required
        />

        <div className="input-group">
          <label htmlFor="condition_status">
            Instrument Condition
          </label>

          <select
            id="condition_status"
            name="condition_status"
            value={formData.condition_status}
            onChange={handleChange}
          >
            <option value="GOOD">Good</option>
            <option value="DAMAGED">Damaged</option>
            <option value="UNFIT">Unfit</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="inspection_status">
            Inspection Result
          </label>

          <select
            id="inspection_status"
            name="inspection_status"
            value={formData.inspection_status}
            onChange={handleChange}
          >
            <option value="PASSED">Passed</option>
            <option value="FAILED">Failed</option>
            <option value="REQUIRES_REPAIR">
              Requires Repair
            </option>
          </select>
        </div>

        <Input
          label="Observed Capacity"
          name="observed_capacity"
          value={formData.observed_capacity}
          onChange={handleChange}
          placeholder="e.g. 500"
        />

        <Input
          label="Observed Accuracy"
          name="observed_accuracy"
          value={formData.observed_accuracy}
          onChange={handleChange}
          placeholder="e.g. 0.02"
        />

        <div className="input-group">
          <label htmlFor="calibration_status">
            Calibration Status
          </label>

          <select
            id="calibration_status"
            name="calibration_status"
            value={formData.calibration_status}
            onChange={handleChange}
          >
            <option value="OK">OK</option>
            <option value="RECALIBRATION_REQUIRED">Recalibration Required</option>
            <option value="NOT_APPLICABLE">Not Applicable</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="seal_condition">
            Seal Condition
          </label>

          <select
            id="seal_condition"
            name="seal_condition"
            value={formData.seal_condition}
            onChange={handleChange}
          >
            <option value="GOOD">Good</option>
            <option value="DAMAGED">Damaged</option>
            <option value="MISSING">Missing</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="compliance_status">
            Compliance Status
          </label>

          <select
            id="compliance_status"
            name="compliance_status"
            value={formData.compliance_status}
            onChange={handleChange}
          >
            <option value="COMPLIANT">Compliant</option>
            <option value="NON_COMPLIANT">Non-Compliant</option>
            <option value="PARTIAL">Partial</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="observations">
          Observations
        </label>

        <textarea
          id="observations"
          name="observations"
          value={formData.observations}
          onChange={handleChange}
          placeholder="Enter inspection observations"
          rows="5"
        />
      </div>

      <Button type="submit">
        Submit Inspection
      </Button>
    </form>
  );
}

export default InspectionForm;