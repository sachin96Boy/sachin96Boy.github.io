import { getDownloadURL, getStorage, ref } from "firebase/storage";
import firebaseApp from "./firebase";

// Env var name kept as-is (VITE_STORAGE_BUCKT_URL) to match the existing Vercel configuration.
const CV_PATH = `${import.meta.env.VITE_STORAGE_BUCKT_URL}/sachinsupunthaka.pdf`;

const MESSAGES = {
  "storage/object-not-found": "The CV file could not be found.",
  "storage/unauthorized": "The CV is not publicly accessible right now.",
  "storage/retry-limit-exceeded": "The network is too slow right now. Please try again.",
};

/** Resolves the CV's Firebase Storage download URL. */
export function getCvUrl() {
  return getDownloadURL(ref(getStorage(firebaseApp), CV_PATH));
}

/** Maps a Firebase Storage error to a user-facing message. */
export function cvErrorMessage(err) {
  return MESSAGES[err?.code] ?? "Couldn't download the CV. Please try again.";
}
