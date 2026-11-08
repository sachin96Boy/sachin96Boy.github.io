import { Link } from "react-router-dom";
import { profile } from "../data/profile";

function Logo() {
  return (
    <Link
      to="/"
      aria-label={`${profile.handle}, home`}
      className="rounded-sm font-mono text-base font-semibold text-fg"
    >
      {profile.handle}
      <span className="text-accent">.</span>
    </Link>
  );
}

export default Logo;
