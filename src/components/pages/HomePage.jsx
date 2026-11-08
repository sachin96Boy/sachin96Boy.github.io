import HeroSection from "../body-comp/HeroSection";
import MyServices from "../body-comp/MyServices";
import WorkExperiences from "../body-comp/WorkExperiences";
import ContactMe from "../body-comp/ContactMe";

function HomePage() {
  return (
    <>
      <HeroSection />
      <MyServices />
      <WorkExperiences />
      <ContactMe />
    </>
  );
}

export default HomePage;
