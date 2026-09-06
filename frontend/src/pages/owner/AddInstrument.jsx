import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import LocationPicker from "../../components/common/LocationPicker";
import instrumentService from "../../services/instrumentService";
import "./AddInstrument.css";

const DEFAULT_AREA_LABEL = "Current area";

const getSerialNumberFromResponse = (response) => {
  const payload = response?.data ?? {};
  const data = payload?.data ?? {};
  const instrument = payload?.instrument ?? data?.instrument ?? {};

  const candidates = [
    payload?.serial_number,
    payload?.data?.serial_number,
    data?.serial_number,
    instrument?.serial_number,
    payload?.instrument?.serial_number,
    data?.instrument?.serial_number,
    payload?.application?.serial_number,
    data?.application?.serial_number,
    payload?.data?.data?.serial_number,
    Array.isArray(payload?.data) ? payload.data[0]?.serial_number : null,
    Array.isArray(data) ? data[0]?.serial_number : null,
  ];

  return candidates.find((value) => value && String(value).trim()) || "";
};

const formatAddressLabel = (value) => {
  if (!value) return DEFAULT_AREA_LABEL;

  const compact = String(value).trim();
  const parts = compact.split(",").map((item) => item.trim()).filter(Boolean);

  return parts.slice(0, 3).join(", ") || compact;
};

function AddInstrument() {
  const navigate = useNavigate();
  const instrumentTypes = [
    "Electronic Weighing Scale",
    "Platform Weighing Scale",
    "Retail Weighing Machine",
    "Digital Balance",
    "Spring Balance",
    "Measuring Instrument"
  ];
  const [formData, setFormData] = useState({
    instrument_name: "",
    instrument_type: "",
    description: "",
    location: "",
    location_address: "",
    latitude: "",
    longitude: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [geoStatus, setGeoStatus] = useState("Waiting for location...");
  const [generatedSerialNumber, setGeneratedSerialNumber] = useState("");
  const [userEditedLocation, setUserEditedLocation] = useState(false);
  const serialDisplayValue = generatedSerialNumber || "Will be generated after submission";
  const formDataRef = useRef(formData);
  const userEditedLocationRef = useRef(userEditedLocation);

  useEffect(() => {
    formDataRef.current = formData;
    userEditedLocationRef.current = userEditedLocation;
  }, [formData, userEditedLocation]);

  useEffect(() => {
    const query = formData.location.trim();
    if (!userEditedLocation || query.length < 3) return undefined;

    const timeout = setTimeout(async () => {
      try {
        setGeoStatus("Finding location on the map...");
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(query)}`,
          { headers: { Accept: "application/json" } }
        );
        if (!response.ok) throw new Error("Location search failed");

        const [result] = await response.json();
        if (!result) {
          setGeoStatus("Location not found. Try adding a city or state.");
          return;
        }

        setFormData((previous) => ({
          ...previous,
          latitude: Number(result.lat).toFixed(6),
          longitude: Number(result.lon).toFixed(6),
          location_address: previous.location_address || result.display_name,
        }));
        setGeoStatus(`Map updated: ${formatAddressLabel(result.display_name)}`);
      } catch {
        setGeoStatus("Unable to find that place yet. You can select it on the map.");
      }
    }, 700);

    return () => clearTimeout(timeout);
  }, [formData.location, userEditedLocation]);

  useEffect(() => {
    const resolveAreaName = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
          { headers: { Accept: "application/json" } }
        );

        if (!response.ok) {
          throw new Error("Location lookup failed");
        }

        const data = await response.json();
        const resolvedAddress = data?.display_name || "Current location";
        const cleanAddress = formatAddressLabel(resolvedAddress);

        const currentFormData = formDataRef.current;
        if (!userEditedLocationRef.current && !currentFormData.location && !currentFormData.location_address) {
          setFormData((previous) => ({
            ...previous,
            location: cleanAddress,
            location_address: cleanAddress,
          }));
        }

        setGeoStatus(`Location ready: ${cleanAddress}`);
      } catch {
        const currentFormData = formDataRef.current;
        if (!userEditedLocationRef.current && !currentFormData.location && !currentFormData.location_address) {
          setFormData((previous) => ({
            ...previous,
            location: DEFAULT_AREA_LABEL,
            location_address: DEFAULT_AREA_LABEL,
          }));
        }
        setGeoStatus("Location ready: current area");
      }
    };

    if (!navigator.geolocation) {
      setGeoStatus("Geolocation is not supported in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setFormData((previous) => ({
          ...previous,
          latitude,
          longitude,
        }));

        await resolveAreaName(latitude, longitude);
      },
      () => {
        setFormData((previous) => ({
          ...previous,
          location: DEFAULT_AREA_LABEL,
          location_address: DEFAULT_AREA_LABEL,
        }));
        setGeoStatus("Unable to access current location. You can still enter coordinates manually.");
      },
      { enableHighAccuracy: true, timeout: 20000 }
    );
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "location" || name === "location_address") {
      setUserEditedLocation(true);
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleMapSelect = async ([latitude, longitude]) => {
    setUserEditedLocation(true);
    setFormData((previous) => ({
      ...previous,
      latitude: latitude.toFixed(6),
      longitude: longitude.toFixed(6),
    }));
    setGeoStatus("Looking up selected location...");

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
        { headers: { Accept: "application/json" } }
      );
      if (!response.ok) throw new Error("Location lookup failed");

      const data = await response.json();
      const address = formatAddressLabel(data?.display_name);
      setFormData((previous) => ({
        ...previous,
        location: address,
        location_address: data?.display_name || address,
      }));
      setGeoStatus(`Selected location: ${address}`);
    } catch {
      setGeoStatus("Location selected. Enter the address manually if needed.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.instrument_name || !formData.instrument_type) {
      setError("Instrument name and type are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const payload = {
        ...formData,
        location: formData.location || formData.location_address || "Current location",
        location_address: formData.location_address || formData.location || "Current location",
      };

      const response = await instrumentService.create(payload);
      const nextSerialNumber = getSerialNumberFromResponse(response);
      const message = response?.data?.message || "Instrument submitted successfully";

      if (!nextSerialNumber) {
        setError("Submission succeeded, but the serial number was not returned. Please refresh and check the instrument record.");
        setHasSubmitted(false);
        return;
      }

      setGeneratedSerialNumber(nextSerialNumber);
      setSuccess(message);
      setHasSubmitted(true);

      setTimeout(() => {
        navigate("/owner/dashboard");
      }, 1200);
    } catch (err) {
      const serverMessage = err?.response?.data?.message || err?.message || "Unable to submit instrument";
      setError(serverMessage);
      setHasSubmitted(false);
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

          <div className="input-group">
            <label htmlFor="location">Area / Location Name</label>
            <input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Teynampet, Chennai"
            />
            <small className="location-status">{geoStatus}</small>
          </div>

          <div className="input-group">
            <label htmlFor="location_address">Address</label>
            <input
              id="location_address"
              name="location_address"
              value={formData.location_address}
              onChange={handleChange}
              placeholder="e.g. Teynampet, Chennai, Tamil Nadu"
            />
          </div>

          <div className="input-group">
            <label>Choose Location From Map</label>
            <LocationPicker
              position={formData.latitude && formData.longitude ? [Number(formData.latitude), Number(formData.longitude)] : null}
              onSelect={handleMapSelect}
            />
          </div>

          <div className="coordinate-grid">
            <div>
              <label htmlFor="latitude">Latitude</label>
              <input
                id="latitude"
                name="latitude"
                type="number"
                step="0.000001"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="13.0827"
              />
            </div>
            <div>
              <label htmlFor="longitude">Longitude</label>
              <input
                id="longitude"
                name="longitude"
                type="number"
                step="0.000001"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="80.2707"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading || hasSubmitted}>
            {loading ? "Submitting..." : hasSubmitted ? "Submitted" : "Submit Instrument"}
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
            <div><span>Serial number</span><strong>{serialDisplayValue}</strong></div>
            <div><span>Location</span><strong>{formatAddressLabel(formData.location || formData.location_address || "Not provided")}</strong></div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default AddInstrument;