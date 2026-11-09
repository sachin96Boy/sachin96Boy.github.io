import { TbBrandFacebook, TbBrandGithub, TbBrandLinkedin, TbBrandTwitter } from "react-icons/tb";
import { useFirebaseData } from "../../hooks/useFirebaseData";
import { getSocial } from "../../lib/firebaseData";
import { fallbackSocial } from "../../data/profile";

const LINKS = [
  { key: "github", label: "GitHub", icon: TbBrandGithub },
  { key: "linkedin", label: "LinkedIn", icon: TbBrandLinkedin },
  { key: "twitter", label: "Twitter", icon: TbBrandTwitter },
  { key: "facebook", label: "Facebook", icon: TbBrandFacebook },
];

/** Social profile links. Renders immediately from fallbacks, then uses the Firebase values. */
function SocialLinks({ className = "" }) {
  const { data } = useFirebaseData("social", getSocial);
  const social = { ...fallbackSocial };
  for (const [key, value] of Object.entries(data ?? {})) if (value) social[key] = value;

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
