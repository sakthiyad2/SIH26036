import { useEffect, useState } from "react";
import InstrumentTable from "../../components/instruments/InstrumentTable";
import instrumentService from "../../services/instrumentService";

function Instruments() {
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadInstruments = async () => {
      try {
        setLoading(true);
        const response = await instrumentService.getAll();
        setInstruments(response?.data?.data || []);
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
      <div className="page-header">
        <h1>Instruments</h1>

        <p>
          Manage registered instruments.
        </p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="empty-state">
          <p>Loading instruments...</p>
        </div>
      ) : (
        <InstrumentTable instruments={instruments} />
      )}
    </div>
  );
}

export default Instruments;