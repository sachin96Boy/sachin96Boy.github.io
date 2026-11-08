import { useEffect, useRef, useState } from "react";
import { TbHandStop } from "react-icons/tb";
import { createAvatarScene } from "./avatarScene";
import AvatarPlaceholder from "./AvatarPlaceholder";
import profilePic from "../../assets/gg-email.webp";
import { profile } from "../../data/profile";

// Fade the legs out at the bottom of the frame instead of a hard cut.
const FADE_MASK = {
  maskImage: "linear-gradient(to bottom, #000 72%, transparent 98%)",
  WebkitMaskImage: "linear-gradient(to bottom, #000 72%, transparent 98%)",
};

/**
 * Animated 3D avatar. Loaded lazily from HeroSection so three.js ships in its own chunk.
 * Waves on load, idles, waves (or stretches) now and then; click/tap or "Say hi" cycles
 * wave → shrug → stretch.
 */
function SachinBoy() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    const reducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let avatar;
    try {
      avatar = createAvatarScene(container, {
        reducedMotion,
        onLoaded: () => setStatus("ready"),
        onError: (err) => {
          console.error("3D avatar failed to load", err);
          setStatus("error");
        },
      });
    } catch (err) {
      // WebGL unavailable (old device, disabled GPU, etc.)
      console.error("3D avatar unavailable", err);
      setStatus("error");
      return undefined;
    }
    sceneRef.current = avatar;
    return () => {
      avatar.dispose();
      sceneRef.current = null;
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div
        ref={containerRef}
        role="img"
        aria-label={`3D avatar of ${profile.name}`}
        style={FADE_MASK}
        className={`absolute inset-0 ${status === "ready" ? "cursor-pointer" : ""} ${
          status === "error" ? "hidden" : ""
        }`}
      />

      {status === "loading" && (
        <div className="absolute inset-0">
          <AvatarPlaceholder />
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={profilePic}
            width="320"
            height="320"
            alt={`Portrait of ${profile.name}`}
            className="h-auto w-3/5 max-w-xs rounded-full"
          />
        </div>
      )}

      {status === "ready" && (
        <button
          type="button"
          onClick={() => sceneRef.current?.playNextGesture()}
          className="btn absolute bottom-4 left-1/2 -translate-x-1/2 border border-line bg-surface/80 text-sm text-fg backdrop-blur hover:border-accent hover:text-accent"
        >
          <TbHandStop aria-hidden="true" className="h-5 w-5" />
          Say hi
        </button>
      )}
    </div>
  );
}

export default SachinBoy;
