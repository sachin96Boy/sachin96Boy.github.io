import React from "react";
import HeroSection from "../body-comp/HeroSection";
import MyServices from "../body-comp/MyServices";
import WorkExperiences from "../body-comp/WorkExperiences";
import Footer from "../footer/Footer";
import ContactMe from "../body-comp/ContactMe";

function HomePage() {
  return (
    <div className="w-full lg:left-64 lg:w-[calc(100vw-18rem)] relative">
      <div className="absolute m-0 right-0 lg:right-12 left-0  bg-gradient-to-r from-slate-400 to-slate-900">
        <HeroSection />
        <MyServices />
        <WorkExperiences />
        <ContactMe />
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
