import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import instrumentService from "../../services/instrumentService";

function AddInstrument() {
  const navigate = useNavigate();
  const instrumentTypes = [
    "Digital Balance",
    "Electronic Weighing Scale",
    "Measuring Instrument",
    "Platform Weighing Scale",
    "Retail Weighing Machine",
    "Spring Balance"
  ];
  const [formData, setFormData] = useState({
    instrument_name: "",
    instrument_type: "",
    serial_number: "",
    description: "",
    location: "",
    status: "PENDING_VERIFICATION",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.instrument_name || !formData.instrument_type || !formData.serial_number || !formData.location) {
      setError("Instrument name, type, serial number and location are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await instrumentService.create(formData);
      setSuccess(
        response?.data?.message ||
        "Instrument submitted successfully"
      );

      setTimeout(() => {
        navigate("/owner/dashboard");
      }, 800);
    } catch (err) {
      setError(err.message || "Unable to submit instrument");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Add Instrument</h1>
          <p>Submit a new instrument for verification.</p>
        </div>
      </div>

      <div className="instrument-entry-layout">
        <div className="auth-page instrument-form">
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
          <Input
            label="Instrument Name"
            name="instrument_name"
            value={formData.instrument_name}
            onChange={handleChange}
            placeholder="e.g. Tractor"
            required
          />

          <div className="input-group">
            <label htmlFor="instrument_type">Instrument Type</label>
            <select
              id="instrument_type"
              name="instrument_type"
              value={formData.instrument_type}
              onChange={handleChange}
              required
            >
              <option value="">Select instrument type</option>
              {instrumentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Serial Number"
            name="serial_number"
            value={formData.serial_number}
            onChange={handleChange}
            placeholder="e.g. EWS-1001"
            required
          />

          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe the instrument"
            />
          </div>

          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Chennai"
            required
          />

          <div className="input-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="PENDING_VERIFICATION">Pending verification</option>
              <option value="REGISTERED">Registered</option>
            </select>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Instrument"}
          </Button>
          </form>
        </div>

        <aside className="instrument-summary">
          <span className="instrument-summary-label">VERIFICATION REQUEST</span>
          <h2>Instrument review</h2>
          <p>
            Your submission will be sent to an official for review and inspector assignment.
          </p>

          <div className="instrument-summary-status">
            <span className="status-dot"></span>
            <div>
              <strong>Pending verification</strong>
              <small>Official review required</small>
            </div>
          </div>

          <div className="instrument-summary-list">
            <div><span>Instrument</span><strong>{formData.instrument_name || "Not provided"}</strong></div>
            <div><span>Type</span><strong>{formData.instrument_type || "Not selected"}</strong></div>
            <div><span>Serial number</span><strong>{formData.serial_number || "Not provided"}</strong></div>
            <div><span>Location</span><strong>{formData.location || "Not provided"}</strong></div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default AddInstrument;