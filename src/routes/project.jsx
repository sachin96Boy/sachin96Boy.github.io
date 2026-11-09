import ProjElements from "../components/body-comp/ProjElements";
import Spinner from "../components/body-comp/item-components/Spinner";
import { getProject } from "../lib/firebaseData";
import { freshOrSnapshot } from "../lib/routeData";
import { pageMeta, summarize } from "../lib/seo";

const load = async ({ params }) => ({ project: await getProject(params.id) });

export const loader = load; // runs at build time for every project id (see react-router.config.js)
export const clientLoader = freshOrSnapshot(load);

/** Shown while a project that wasn't pre-rendered loads in the browser. */
export function HydrateFallback() {
  return (
    <div className="section">
      <Spinner label="Loading project…" />
    </div>
  );
}

export const meta = ({ loaderData, params }) => {
  const project = loaderData?.project;
  return pageMeta({
    title: project ? project.name : "Project not found",
    path: `/portfolio/project/${params.id}`,
    description: project?.description
      ? summarize(project.description)
      : "A project from Sachin Supunthaka's portfolio.",
    noindex: !project,
  });
};

export default function Project({ loaderData }) {
  return <ProjElements project={loaderData.project} />;
}
