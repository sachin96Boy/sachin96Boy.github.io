import SocialLinks from "../profile/SocialLinks";
import { profile } from "../../data/profile";

function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-center text-sm text-muted sm:px-6 lg:px-10">
        <SocialLinks className="justify-center" />
        <p>
          © {new Date().getFullYear()} ·{" "}
          <a
            href="https://github.com/sachin96Boy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg underline-offset-4 hover:underline"
          >
            Made with <span className="text-accent">♥</span> by {profile.handle}
          </a>
        </p>
        <p className="text-xs">
          Avatar motion data from{" "}
          <a
            href="http://mocap.cs.cmu.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-fg"
          >
            mocap.cs.cmu.edu
          </a>
          , created with funding from NSF EIA-0196217.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
