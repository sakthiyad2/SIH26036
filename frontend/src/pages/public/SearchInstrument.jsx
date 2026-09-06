import { useEffect, useState } from "react";
import InstrumentCard from "../../components/instruments/InstrumentCard";
import instrumentService from "../../services/instrumentService";
import "./SearchInstrument.css";

function SearchInstrument() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const trimmedSearch = search.trim();

    if (!trimmedSearch) {
      setResults([]);
      setError("");
      return;
    }

    const fetchInstrument = async () => {
      try {
        setLoading(true);
        const response = await instrumentService.search(trimmedSearch);
        const payload = response?.data?.data;

        setResults(payload ? [payload] : []);
        setError("");
      } catch (requestError) {
        setResults([]);
        setError(requestError?.response?.data?.message || "No instrument found.");
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchInstrument, 250);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="public-page">
      <section className="search-section">
        <h1>Search Instrument</h1>

        <p>
          Search for publicly available
          instrument verification information.
        </p>

        <div className="input-group">
          <label>
            Serial Number
          </label>

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Enter serial number"
          />
        </div>

        <div className="search-results">
          {loading && <p>Loading records...</p>}

          {!loading && error && <p>{error}</p>}

          {!loading && !error && search.trim() &&
            results.map((instrument) => (
              <InstrumentCard
                key={instrument.instrument_id}
                instrument={instrument}
              />
            ))}

          {!loading && !error && !search.trim() && (
            <p>Search for an instrument by serial number to view verification details.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default SearchInstrument;