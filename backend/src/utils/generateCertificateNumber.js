// Certificate number generator placeholder.
const generateCertificateNumber = () => {
  const year = new Date().getFullYear();

  const random = Math.floor(
    100000 + Math.random() * 900000
  );

  return `CERT-${year}-${random}`;
};

module.exports = generateCertificateNumber;