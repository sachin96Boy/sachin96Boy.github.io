import React from "react";
import HeroSection from "../body-comp/HeroSection";
import BodyComponent from "../body-comp/BodyComponent";
import MyServices from "../body-comp/MyServices";
import WorkExperiences from "../body-comp/WorkExperiences";

function HomePage() {
  return (
    <div className="h-full left-64 w-[calc(100vw-21rem)] relative">
      <div className="absolute  bg-gradient-to-r from-slate-500 to-slate-900">
        <HeroSection />
        <MyServices />
        <WorkExperiences />
        <BodyComponent />
      </div>
    </div>
  );
}

export default HomePage;
