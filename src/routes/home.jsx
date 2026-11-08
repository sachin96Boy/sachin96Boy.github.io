import HeroSection from "../components/body-comp/HeroSection";
import MyServices from "../components/body-comp/MyServices";
import WorkExperiences from "../components/body-comp/WorkExperiences";
import ContactMe from "../components/body-comp/ContactMe";
import { getWorkExperience } from "../lib/firebaseData";
import { freshOrSnapshot } from "../lib/routeData";
import { pageMeta, personJsonLd } from "../lib/seo";

const load = async () => ({ work: await getWorkExperience() });

export const loader = load; // runs at build time (pre-render)
export const clientLoader = freshOrSnapshot(load);

export const meta = () => [
  ...pageMeta({
    path: "/",
    description:
      "Sachin Supunthaka (Sachin96Boy): full-stack web and mobile app developer and freelance 3D animator from Sri Lanka. React, Node.js, Flutter and Blender.",
  }),
  { "script:ld+json": personJsonLd },
];

export default function Home({ loaderData }) {
  return (
    <>
      <HeroSection />
      <MyServices />
      <WorkExperiences work={loaderData.work} />
      <ContactMe />
    </>
  );
}
