import ProjectCard from "./item-components/ProjectCard";
import Spinner from "./item-components/Spinner";
import LoadError from "./item-components/LoadError";
import { useFirebaseJson } from "../../hooks/useFirebaseJson";
import illustration from "../../assets/3dimage.webp";

function MyProjects({ titleAs: Title = "h2" }) {
  const projects = useFirebaseJson("Projects", { expect: "array" });
  const { data: social } = useFirebaseJson("social", { expect: "object" });
  const list = (projects.data ?? []).filter(Boolean);

  let content;
  if (projects.loading) content = <Spinner label="Loading projects…" />;
  else if (projects.error) content = <LoadError what="projects" onRetry={projects.retry} />;
  else
    content = (
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {list.map((project, index) => (
          <li key={project.id ?? index}>
            <ProjectCard {...project} />
          </li>
        ))}
      </ul>
    );

  return (
    <section aria-labelledby="projects-title">
      <div className="section">
        <p className="eyebrow">Portfolio</p>
        <Title id="projects-title" className="section-title mt-2">
          My Portfolio Projects
        </Title>

        {social?.fiverr && (
          <div className="card mt-8 flex flex-col items-center gap-6 sm:flex-row">
            <img
              src={illustration}
              alt=""
              width="256"
              height="309"
              loading="lazy"
              className="h-40 w-auto"
            />
            <p className="text-xl text-fg">
              Check out my 3D animation work on{" "}
              <a
                href={social.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent underline-offset-4 hover:underline"
              >
                Fiverr
              </a>
              .
            </p>
          </div>
        )}

        <div className="mt-10">{content}</div>
      </div>
    </section>
  );
}

export default MyProjects;
