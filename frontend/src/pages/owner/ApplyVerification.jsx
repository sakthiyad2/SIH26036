import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import useNotification from "../../hooks/useNotification";

function ApplyVerification() {
  const navigate = useNavigate();

  const { addNotification } =
    useNotification();

  const [formData, setFormData] = useState({
    instrument: "",
    applicationType: "NEW",
    preferredDate: "",
    remarks: "",
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

    addNotification(
      "Verification application submitted.",
      "success"
    );

    navigate("/owner/applications");
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Apply for Verification</h1>

        <p>
          Submit an online verification request.
        </p>
      </div>

      <form
        className="form-card"
        onSubmit={handleSubmit}
      >
        <div className="input-group">
          <label>Instrument</label>

          <select
            name="instrument"
            value={formData.instrument}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Instrument
            </option>

            <option value="1">
              Electronic Weighing Scale
            </option>

            <option value="2">
              Platform Scale
            </option>
          </select>
        </div>

        <div className="input-group">
          <label>Application Type</label>

          <select
            name="applicationType"
            value={formData.applicationType}
            onChange={handleChange}
          >
            <option value="NEW">
              New Verification
            </option>

            <option value="RENEWAL">
              Renewal
            </option>

            <option value="REVERIFICATION">
              Re-verification
            </option>
          </select>
        </div>

        <div className="input-group">
          <label>Preferred Inspection Date</label>

          <input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
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

        <Button type="submit">
          Submit Application
        </Button>
      </form>
    </div>
  );
}

export default ApplyVerification;