import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

function InstrumentForm({
  initialData = {},
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    instrument_name:
      initialData.instrument_name || "",
    manufacturer:
      initialData.manufacturer || "",
    model_number:
      initialData.model_number || "",
    capacity:
      initialData.capacity || "",
    unit:
      initialData.unit || "",
    location:
      initialData.location || "",
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
      className="instrument-form"
      onSubmit={handleSubmit}
    >
      <Input
        label="Instrument Name"
        name="instrument_name"
        value={formData.instrument_name}
        onChange={handleChange}
        placeholder="Enter instrument name"
        required
      />

      <Input
        label="Manufacturer"
        name="manufacturer"
        value={formData.manufacturer}
        onChange={handleChange}
        placeholder="Enter manufacturer"
        required
      />

      <Input
        label="Model Number"
        name="model_number"
        value={formData.model_number}
        onChange={handleChange}
        placeholder="Enter model number"
      />

      <Input
        label="Capacity"
        name="capacity"
        type="number"
        value={formData.capacity}
        onChange={handleChange}
        placeholder="Enter capacity"
      />

      <Input
        label="Unit"
        name="unit"
        value={formData.unit}
        onChange={handleChange}
        placeholder="kg, g, litre, metre..."
      />

      <Input
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Enter instrument location"
      />

      <div className="form-actions">
        <Button type="submit">
          Save Instrument
        </Button>

        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export default InstrumentForm;