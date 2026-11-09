import { Link } from "react-router";
import { TbArrowRight, TbMail } from "react-icons/tb";
import { mailto, profile } from "../../../data/profile";

const ROLE_STYLES = ["text-fg", "text-muted", "text-accent"];

function HeroText() {
  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
      <p className="eyebrow">Hi, I&apos;m {profile.name}</p>
      <h1
        id="hero-title"
        className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl xl:text-6xl"
      >
        {profile.heroRoles.map((role, i) => (
          <span key={role} className={`block ${ROLE_STYLES[i % ROLE_STYLES.length]}`}>
            {role}
            {i < profile.heroRoles.length - 1 && <span className="sr-only">, </span>}
          </span>
        ))}
      </h1>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
        Full-stack developer building responsive web apps with React and Node.js, mobile apps
        with Flutter, and 3D animation for startups and small businesses.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
        <a href={mailto} className="btn-primary">
          <TbMail aria-hidden="true" className="h-5 w-5" />
          Contact Me
        </a>
        <Link to="/portfolio" className="btn-secondary">
          Portfolio
          <TbArrowRight aria-hidden="true" className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}

export default HeroText;
