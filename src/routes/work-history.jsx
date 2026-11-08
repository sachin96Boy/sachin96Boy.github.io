import WorkExperiences from "../components/body-comp/WorkExperiences";
import { getWorkExperience } from "../lib/firebaseData";
import { freshOrSnapshot } from "../lib/routeData";
import { pageMeta } from "../lib/seo";

const load = async () => ({ work: await getWorkExperience() });

export const loader = load; // runs at build time (pre-render)
export const clientLoader = freshOrSnapshot(load);

export const meta = () =>
  pageMeta({
    title: "Work History",
    path: "/workhistory",
    description:
      "Sachin Supunthaka's work experience as a software engineer and full-stack, front-end and mobile developer.",
  });

export default function WorkHistory({ loaderData }) {
  return <WorkExperiences titleAs="h1" work={loaderData.work} />;
}
