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