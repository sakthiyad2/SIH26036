import { useState } from "react";
import InstrumentCard from "../../components/instruments/InstrumentCard";
import "./SearchInstrument.css";

function SearchInstrument() {
  const [search, setSearch] =
    useState("");

  const [results] = useState([
    {
      instrument_id: 1,
      instrument_name:
        "Electronic Weighing Scale",
      serial_number: "EWS-1001",
      manufacturer: "ABC Instruments",
      model_number: "ABC-500",
      capacity: "500",
      unit: "kg",
      status: "VERIFIED",
    },
  ]);

  const filteredResults =
    results.filter((instrument) =>
      instrument.serial_number
        .toLowerCase()
        .includes(search.toLowerCase())
    );

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
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Enter serial number"
          />
        </div>

        <div className="search-results">
          {search &&
            filteredResults.map(
              (instrument) => (
                <InstrumentCard
                  key={
                    instrument.instrument_id
                  }
                  instrument={instrument}
                />
              )
            )}

          {search &&
            filteredResults.length === 0 && (
              <p>
                No instrument found.
              </p>
            )}
        </div>
      </section>
    </div>
  );
}

export default SearchInstrument;