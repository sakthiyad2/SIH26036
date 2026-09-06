import { useEffect, useState } from "react";
import InstrumentTable from "../../components/instruments/InstrumentTable";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import instrumentService from "../../services/instrumentService";

function MyInstruments() {
  const navigate = useNavigate();
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadInstruments = async () => {
      try {
        setLoading(true);
        const response = await instrumentService.getMyInstruments();
        setInstruments(response?.data?.data || []);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load instruments");
      } finally {
        setLoading(false);
      }
    };

    loadInstruments();
  }, []);

  return (
    <div className="page">
      <div className="page-header page-header-actions">
        <div>
          <h1>My Instruments</h1>
          <p>
            Manage your registered weighing and
            measuring instruments.
          </p>
        </div>

        <Button
          onClick={() =>
            navigate("/owner/instruments/add")
          }
        >
          + Add Instrument
        </Button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="empty-state">
          <p>Loading instruments...</p>
        </div>
      ) : (
        <InstrumentTable
          instruments={instruments}
          onView={(instrument) =>
            navigate(
              `/owner/instruments/${instrument.instrument_id}`
            )
          }
        />
      )}
    </div>
  );
}

export default MyInstruments;