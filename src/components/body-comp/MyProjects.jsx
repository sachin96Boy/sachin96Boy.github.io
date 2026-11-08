import ProjectCard from "./item-components/ProjectCard";
import illustration from "../../assets/3dimage.webp";

/** Project grid. Data comes from the route loader (pre-rendered, refreshed in the browser). */
function MyProjects({ titleAs: Title = "h2", projects = [], fiverr = null }) {
  const content = projects.length ? (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {projects.map((project, index) => (
        <li key={project.id ?? index}>
          <ProjectCard {...project} />
        </li>
      ))}
    </ul>
  ) : (
    <p className="card text-muted">Projects will be listed here soon.</p>
  );

  return (
    <section aria-labelledby="projects-title">
      <div className="section">
        <p className="eyebrow">Portfolio</p>
        <Title id="projects-title" className="section-title mt-2">
          My Portfolio Projects
        </Title>

        {fiverr && (
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
                href={fiverr}
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
