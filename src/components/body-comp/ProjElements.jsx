import { useNavigate, useParams } from "react-router-dom";
import { TbArrowLeft, TbExternalLink } from "react-icons/tb";
import Spinner from "./item-components/Spinner";
import LoadError from "./item-components/LoadError";
import { splitTags } from "./item-components/ProjectCard";
import { useFirebaseJson } from "../../hooks/useFirebaseJson";

const FALLBACK_IMAGE = "/imageAssets/Night-sky-Image.webp";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate("/portfolio")} className="btn-secondary">
      <TbArrowLeft aria-hidden="true" className="h-5 w-5" />
      Back to portfolio
    </button>
  );
}

function ProjElements() {
  const { id } = useParams();
  const { data, loading, error, retry } = useFirebaseJson("Projects", { expect: "array" });
  const project = (data ?? []).filter(Boolean).find((p) => String(p.id) === id);

  let content;
  if (loading) {
    content = <Spinner label="Loading project…" />;
  } else if (error) {
    content = <LoadError what="this project" onRetry={retry} />;
  } else if (!project) {
    content = (
      <div className="card text-center">
        <h1 className="text-2xl font-semibold text-fg">Project not found</h1>
        <p className="mt-2 text-muted">It may have been moved or removed.</p>
      </div>
    );
  } else {
    // "Refference" is the field name used in the database.
    const link = project.Refference;
    content = (
      <article className="flex flex-col items-center text-center">
        <h1 className="section-title">{project.name}</h1>
        <img
          className="mt-8 h-auto w-full max-w-md rounded-xl border border-line shadow-2xl shadow-black/40"
          src={project.imgPath || FALLBACK_IMAGE}
          alt={`Screenshot of ${project.name}`}
          onError={(e) => {
            if (!e.currentTarget.src.endsWith(FALLBACK_IMAGE)) e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {splitTags(project.tags).map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
        {project.description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{project.description}</p>
        )}
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
            Visit project
            <TbExternalLink aria-hidden="true" className="h-5 w-5" />
          </a>
        )}
      </article>
    );
  }

  return (
    <div className="section">
      <div className="mb-8">
        <BackButton />
      </div>
      {content}
    </div>
  );
}

export default ProjElements;
