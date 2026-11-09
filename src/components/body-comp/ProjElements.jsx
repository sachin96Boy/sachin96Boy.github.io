import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { TbArrowLeft, TbExternalLink } from "react-icons/tb";
import { splitTags } from "./item-components/ProjectCard";

const FALLBACK_IMAGE = "/imageAssets/Night-sky-Image.webp";

/**
 * Project screenshot with a fallback. The page is pre-rendered, so the image can fail before
 * React hydrates (when `onError` isn't attached yet); the effect catches that case too.
 */
function ProjectImage({ src, alt }) {
  const [current, setCurrent] = useState(src || FALLBACK_IMAGE);
  const ref = useRef(null);
  const showFallback = () => setCurrent((c) => (c === FALLBACK_IMAGE ? c : FALLBACK_IMAGE));

  useEffect(() => {
    setCurrent(src || FALLBACK_IMAGE);
  }, [src]);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) showFallback();
  }, [current]);

  return (
    <img
      ref={ref}
      className="mt-8 h-auto w-full max-w-md rounded-xl border border-line shadow-2xl shadow-black/40"
      src={current}
      alt={alt}
      onError={showFallback}
    />
  );
}

function BackButton() {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate("/portfolio")} className="btn-secondary">
      <TbArrowLeft aria-hidden="true" className="h-5 w-5" />
      Back to portfolio
    </button>
  );
}

/** Project detail. `project` comes from the route loader; null when the id doesn't exist. */
function ProjElements({ project }) {
  let content;
  if (!project) {
    content = (
      <div className="card text-center">
        <h1 className="text-2xl font-semibold text-fg">Project not found</h1>
        <p className="mt-2 text-muted">It may have been moved or removed.</p>
      </div>
    );
  } else {
    const link = project.reference;
    content = (
      <article className="flex flex-col items-center text-center">
        <h1 className="section-title">{project.name}</h1>
        <ProjectImage src={project.imgPath} alt={`Screenshot of ${project.name}`} />
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
