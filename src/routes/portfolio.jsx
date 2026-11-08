import MyProjects from "../components/body-comp/MyProjects";
import { getProjects, getSocial } from "../lib/firebaseData";
import { freshOrSnapshot } from "../lib/routeData";
import { pageMeta } from "../lib/seo";

async function load() {
  const [projects, social] = await Promise.all([getProjects(), getSocial().catch(() => ({}))]);
  return { projects, fiverr: social.fiverr ?? null };
}

export const loader = load; // runs at build time (pre-render)
export const clientLoader = freshOrSnapshot(load);

export const meta = () =>
  pageMeta({
    title: "Portfolio",
    path: "/portfolio",
    description:
      "Web and mobile projects by Sachin Supunthaka built with React, Node.js, Flutter and Firebase, plus 3D animation work.",
  });

export default function Portfolio({ loaderData }) {
  return <MyProjects titleAs="h1" projects={loaderData.projects} fiverr={loaderData.fiverr} />;
}
