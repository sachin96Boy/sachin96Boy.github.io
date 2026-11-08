import { Link } from "react-router-dom";
import { TbArrowRight, TbBrandGithub, TbWorld } from "react-icons/tb";

export const splitTags = (tags) =>
  (typeof tags === "string" ? tags.split(",") : Array.isArray(tags) ? tags : [])
    .map((t) => String(t).trim())
    .filter(Boolean);

function ProjectCard({ name, tags, github, id }) {
  const Icon = github ? TbBrandGithub : TbWorld;
  return (
    <article className="card flex h-full flex-col gap-4 transition-[transform,border-color] duration-200 hover:border-accent/60 motion-safe:hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-fg">{name}</h3>
        <Icon
          role="img"
          aria-label={github ? "Open-source project" : "Web project"}
          className="h-7 w-7 shrink-0 text-muted"
        />
      </div>
      <ul className="flex flex-wrap gap-2">
        {splitTags(tags).map((tag) => (
          <li key={tag} className="tag">
            {tag}
          </li>
        ))}
      </ul>
      <Link
        to={`project/${id}`}
        className="mt-auto inline-flex items-center gap-1 self-end rounded-sm font-medium text-accent hover:text-accent-hover"
      >
        See more<span className="sr-only"> about {name}</span>
        <TbArrowRight aria-hidden="true" className="h-4 w-4" />
      </Link>
    </article>
  );
}

export default ProjectCard;
