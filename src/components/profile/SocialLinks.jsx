import { TbBrandFacebook, TbBrandGithub, TbBrandLinkedin, TbBrandTwitter } from "react-icons/tb";
import { useFirebaseJson } from "../../hooks/useFirebaseJson";
import { fallbackSocial } from "../../data/profile";

const LINKS = [
  { key: "github", label: "GitHub", icon: TbBrandGithub },
  { key: "linkdin", label: "LinkedIn", icon: TbBrandLinkedin }, // DB key is spelled "linkdin"
  { key: "twitter", label: "Twitter", icon: TbBrandTwitter },
  { key: "facebook", label: "Facebook", icon: TbBrandFacebook },
];

/** Social profile links. Renders immediately from fallbacks, then uses the Firebase values. */
function SocialLinks({ className = "" }) {
  const { data } = useFirebaseJson("social", { expect: "object" });
  const social = { ...fallbackSocial, ...(data ?? {}) };

  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {LINKS.filter(({ key }) => social[key]).map(({ key, label, icon: Icon }) => (
        <li key={key}>
          <a
            href={social[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (opens in a new tab)`}
            className="icon-link"
          >
            <Icon aria-hidden="true" className="h-6 w-6" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SocialLinks;
