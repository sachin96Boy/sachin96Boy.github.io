import WorkExperienceCard from "./item-components/WorkExperienceCard";
import Spinner from "./item-components/Spinner";
import LoadError from "./item-components/LoadError";
import { useFirebaseJson } from "../../hooks/useFirebaseJson";

function WorkExperiences({ titleAs: Title = "h2" }) {
  const { data, loading, error, retry } = useFirebaseJson("workExperience", { expect: "array" });
  const work = (data ?? []).filter(Boolean);

  let content;
  if (loading) content = <Spinner label="Loading work experience…" />;
  else if (error) content = <LoadError what="work experience" onRetry={retry} />;
  else
    content = (
      <ol className="space-y-4">
        {work.map((item, index) => (
          <li key={`${item.company}-${item.position}-${item.duration ?? index}`}>
            <WorkExperienceCard {...item} />
          </li>
        ))}
      </ol>
    );

  return (
    <section aria-labelledby="work-title">
      <div className="section grid gap-8 lg:grid-cols-3">
        <div>
          <p className="eyebrow">Experience</p>
          <Title id="work-title" className="section-title mt-2">
            Work Experiences
          </Title>
        </div>
        <div className="lg:col-span-2">{content}</div>
      </div>
    </section>
  );
}

export default WorkExperiences;
