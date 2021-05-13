import { useState, useEffect } from "react";
import QRCode from "qrcode";

function useQRCode(pageUrl) {
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(() => {
    function handleDataUrlChange(url) {
      setDataUrl(url);
    }

    QRCode.toDataURL(pageUrl, { width: 400 })
      .then(handleDataUrlChange)
      .catch((err) => {
        console.error(err);
      });
  });

  return dataUrl;
}

export default useQRCode;
