import WorkExperienceCard from "./item-components/WorkExperienceCard";

/** Work history list. `work` comes from the route loader (pre-rendered, refreshed in the browser). */
function WorkExperiences({ titleAs: Title = "h2", work = [] }) {
  return (
    <section aria-labelledby="work-title">
      <div className="section grid gap-8 lg:grid-cols-3">
        <div>
          <p className="eyebrow">Experience</p>
          <Title id="work-title" className="section-title mt-2">
            Work Experiences
          </Title>
        </div>
        <div className="lg:col-span-2">
          {work.length ? (
            <ol className="space-y-4">
              {work.map((item, index) => (
                <li key={item.id ?? `${item.company}-${item.position}-${index}`}>
                  <WorkExperienceCard {...item} />
                </li>
              ))}
            </ol>
          ) : (
            <p className="card text-muted">Work history will be listed here soon.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default WorkExperiences;
