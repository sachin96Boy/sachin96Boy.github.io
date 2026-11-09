import { TbMail } from "react-icons/tb";
import { mailto, profile } from "../../data/profile";
import SocialLinks from "../profile/SocialLinks";

function ContactMe({ titleAs: Title = "h2" }) {
  return (
    <section aria-labelledby="contact-title" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_70%_at_50%_100%,rgba(34,197,94,0.12),transparent_70%)]"
      />
      <div className="section flex min-h-[50vh] flex-col items-center justify-center text-center">
        <p className="eyebrow">Contact</p>
        <Title id="contact-title" className="section-title mt-2">
          Love to hear from you
        </Title>
        <p className="mt-3 text-xl text-muted">Let’s get in touch.</p>
        <a href={mailto} className="btn-primary mt-8 px-8">
          <TbMail aria-hidden="true" className="h-5 w-5" />
          Email me
        </a>
        <a
          href={mailto}
          className="mt-4 break-all font-mono text-sm text-muted underline-offset-4 hover:text-fg hover:underline"
        >
          {profile.email}
        </a>
        <SocialLinks className="mt-6 justify-center" />
      </div>
    </section>
  );
}

export default ContactMe;
