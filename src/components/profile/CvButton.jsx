import { useState } from "react";
import { TbFileDownload } from "react-icons/tb";

function CvButton() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    // Open the tab synchronously, inside the click, so popup blockers allow it.
    const tab = window.open("", "_blank");
    setBusy(true);
    setError(null);
    let cvErrorMessage = () => "Couldn't download the CV. Please try again.";
    try {
      // Firebase Storage is only downloaded when someone actually asks for the CV.
      const cv = await import("../../firebase/cv");
      cvErrorMessage = cv.cvErrorMessage;
      const url = await cv.getCvUrl();
      if (tab) {
        tab.opener = null;
        tab.location.href = url;
      } else {
        window.location.assign(url);
      }
    } catch (err) {
      tab?.close();
      console.error("CV download failed", err);
      setError(cvErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleClick} disabled={busy} className="btn-secondary w-full">
        <TbFileDownload aria-hidden="true" className="h-5 w-5" />
        {busy ? "Preparing CV…" : "Download CV"}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

export default CvButton;
