import { useState, useRef } from "react";
import QRCode from "qrcode";
import styles from "../styles/QRCodeGenerator.module.css";

const QRCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const canvasRef = useRef(null);

  const generateQRCode = async () => {
    if (!url) {
      alert("Legg til en link.");
      return;
    }

    try {
      const qrCodeData = await QRCode.toDataURL(url, {
        width: 256,
        height: 256,
      });
      setQrCode(qrCodeData);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      generateQRCode();
    }
  };

  const downloadPNG = () => {
    if (!qrCode) {
      alert("Generer en QR kode først.");
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const png = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = png;
      downloadLink.download = "QRCodeByOleKoder.png";
      downloadLink.click();
    };
    img.src = qrCode;
  };

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Legg til link"
      />
      <button onClick={generateQRCode}>Generer en QR Kode</button>
      {qrCode && (
        <>
          <h2>Den genererte QR Koden:</h2>
          <div className={styles.qrContainer}>
            <img src={qrCode} alt="QR Code" />
            <br />
            <button onClick={downloadPNG}>Last ned som PNG</button>
          </div>
        </>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default QRCodeGenerator;
