import profilePic from "../../assets/gg-email.webp";
import { profile } from "../../data/profile";
import SocialLinks from "./SocialLinks";
import CvButton from "./CvButton";

/** Profile summary shared by the desktop sidebar and the mobile drawer. */
function ProfilePanel({ compact = false }) {
  const size = compact ? "h-28 w-28" : "h-40 w-40";
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <img
            className={`${size} rounded-full border-2 border-line object-cover p-1`}
            src={profilePic}
            width="160"
            height="160"
            alt={`Portrait of ${profile.name}`}
          />
          <span
            className="absolute bottom-2 right-3 h-4 w-4 rounded-full border-2 border-surface bg-accent"
            title="Available for work"
          >
            <span className="sr-only">Available for work</span>
          </span>
        </div>
        <p className="mt-4 text-xl font-semibold text-fg">{profile.name}</p>
        {profile.roles.map((role) => (
          <p key={role} className="mt-1 text-sm text-muted">
            {role}
          </p>
        ))}
        <SocialLinks className="mt-3 justify-center" />
      </div>

      <dl className="rounded-xl border border-line bg-surface-2/60 p-4 text-sm">
        <dt className="font-medium text-fg">Education</dt>
        <dd className="mt-1 text-muted">{profile.education.degree}</dd>
        <dd className="text-xs text-muted">{profile.education.school}</dd>
        <dt className="mt-3 font-medium text-fg">Country</dt>
        <dd className="mt-1 text-muted">{profile.country}</dd>
        <dt className="mt-3 font-medium text-fg">Languages</dt>
        <dd className="mt-1 text-muted">{profile.languages.join(", ")}</dd>
      </dl>

      <CvButton />
    </div>
  );
}

export default ProfilePanel;
