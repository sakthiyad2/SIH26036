const generateInstrumentSerialNumber = (instrumentId) => {
  const year = new Date().getFullYear();

  if (!instrumentId && instrumentId !== 0) {
    throw new Error("Instrument ID is required to generate a serial number");
  }

  return `SIH-INS-${year}-${String(instrumentId).padStart(6, "0")}`;
};

module.exports = generateInstrumentSerialNumber;
