import { TbBriefcase, TbCalendar } from "react-icons/tb";

function WorkExperenceCard({ company, position, duration, description }) {
  return (
    <article className="card">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-fg">{position}</h3>
          <p className="mt-1 flex items-center gap-2 text-accent">
            <TbBriefcase aria-hidden="true" className="h-4 w-4 shrink-0" />
            {company}
          </p>
        </div>
        {duration && (
          <p className="tag shrink-0 gap-1.5 self-start">
            <TbCalendar aria-hidden="true" className="h-3.5 w-3.5" />
            {duration}
          </p>
        )}
      </div>
      {description && <p className="mt-4 leading-relaxed text-muted">{description}</p>}
    </article>
  );
}

export default WorkExperenceCard;
