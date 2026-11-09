import ContactMe from "../components/body-comp/ContactMe";
import { pageMeta } from "../lib/seo";

export const meta = () =>
  pageMeta({
    title: "Contact",
    path: "/contact",
    description:
      "Get in touch with Sachin Supunthaka about web, mobile or 3D animation projects.",
  });

export default function Contact() {
  return <ContactMe titleAs="h1" />;
}
