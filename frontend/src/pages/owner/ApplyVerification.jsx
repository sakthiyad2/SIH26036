import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import useNotification from "../../hooks/useNotification";
import instrumentService from "../../services/instrumentService";
import applicationService from "../../services/applicationService";

function ApplyVerification() {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    instrument_id: "",
    application_type: "NEW_VERIFICATION",
    preferred_date: "",
    remarks: "",
  });

  useEffect(() => {
    const loadInstruments = async () => {
      try {
        setLoading(true);
        const response = await instrumentService.getMyInstruments();
        const data = response?.data?.data || [];
        setInstruments(data);
        if (data[0]) {
          setFormData((previous) => ({ ...previous, instrument_id: String(data[0].instrument_id) }));
        }
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load instruments");
      } finally {
        setLoading(false);
      }
    };

    loadInstruments();
  }, []);

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

    if (!formData.instrument_id) {
      setError("Please select an instrument");
      return;
    }

    try {
      setSubmitting(true);
      await applicationService.create({
        instrument_id: Number(formData.instrument_id),
        application_type: formData.application_type,
        preferred_date: formData.preferred_date || null,
        remarks: formData.remarks || "",
      });

      addNotification("Verification application submitted.", "success");
      navigate("/owner/applications");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Apply for Verification</h1>

        <p>
          Submit an online verification request.
        </p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Instrument</label>

          <select
            name="instrument_id"
            value={formData.instrument_id}
            onChange={handleChange}
            required
            disabled={loading || instruments.length === 0}
          >
            <option value="">Select Instrument</option>
            {instruments.map((instrument) => (
              <option key={instrument.instrument_id} value={instrument.instrument_id}>
                {instrument.instrument_name} ({instrument.serial_number || "Serial pending"})
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Application Type</label>

          <select
            name="application_type"
            value={formData.application_type}
            onChange={handleChange}
          >
            <option value="NEW_VERIFICATION">New Verification</option>
            <option value="RENEWAL">Renewal</option>
            <option value="REVERIFICATION">Re-verification</option>
          </select>
        </div>

        <div className="input-group">
          <label>Preferred Inspection Date</label>

          <input
            type="date"
            name="preferred_date"
            value={formData.preferred_date}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Remarks</label>

          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows="5"
            placeholder="Enter additional information"
          />
        </div>

        <Button type="submit" disabled={submitting || loading || instruments.length === 0}>
          {submitting ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </div>
  );
}

export default ApplyVerification;