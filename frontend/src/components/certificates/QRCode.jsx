import { QRCodeCanvas } from "qrcode.react";

function QRCode({ value }) {
  if (!value) {
    return null;
  }

  return (
    <div className="certificate-qr-code">
      <QRCodeCanvas
        value={value}
        size={190}
        level="H"
        includeMargin
      />
      <small>Scan to verify this certificate</small>
    </div>
  );
}

export default QRCode;