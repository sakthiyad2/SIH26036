import { useState } from "react";
import Button from "../common/Button";

function MeasurementForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    test_name: "",
    standard_value: "",
    observed_value: "",
    permissible_error: "",
    remarks: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const calculateError = () => {
    const standard = Number(
      formData.standard_value
    );

    const observed = Number(
      formData.observed_value
    );

    if (
      formData.standard_value === "" ||
      formData.observed_value === ""
    ) {
      return "";
    }

    return (observed - standard).toFixed(4);
  };

  const calculateResult = () => {
    const error = Math.abs(
      Number(calculateError())
    );

    const permissible = Number(
      formData.permissible_error
    );

    if (
      formData.permissible_error === ""
    ) {
      return "";
    }

    return error <= permissible
      ? "PASS"
      : "FAIL";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const resultData = {
      ...formData,
      error_value: calculateError(),
      result: calculateResult(),
    };

    if (onSubmit) {
      onSubmit(resultData);
    }
  };

  return (
    <form
      className="measurement-form"
      onSubmit={handleSubmit}
    >
      <div className="input-group">
        <label>Test Name</label>

        <input
          type="text"
          name="test_name"
          value={formData.test_name}
          onChange={handleChange}
          placeholder="Example: 10 kg test"
          required
        />
      </div>

      <div className="input-group">
        <label>Standard Value</label>

        <input
          type="number"
          step="0.0001"
          name="standard_value"
          value={formData.standard_value}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label>Observed Value</label>

        <input
          type="number"
          step="0.0001"
          name="observed_value"
          value={formData.observed_value}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label>Permissible Error</label>

        <input
          type="number"
          step="0.0001"
          name="permissible_error"
          value={formData.permissible_error}
          onChange={handleChange}
          required
        />
      </div>

      {calculateError() !== "" && (
        <div className="measurement-preview">
          <p>
            <strong>Error:</strong>{" "}
            {calculateError()}
          </p>

          <p>
            <strong>Result:</strong>{" "}
            {calculateResult()}
          </p>
        </div>
      )}

      <div className="input-group">
        <label>Remarks</label>

        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          rows="4"
        />
      </div>

      <Button type="submit">
        Save Measurement
      </Button>
    </form>
  );
}

export default MeasurementForm;