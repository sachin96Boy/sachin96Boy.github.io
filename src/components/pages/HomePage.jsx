import React from "react";
import HeroSection from "../body-comp/HeroSection";
import BodyComponent from "../body-comp/BodyComponent";
import MyServices from "../body-comp/MyServices";
import WorkExperiences from "../body-comp/WorkExperiences";
import Footer from "../footer/Footer";

function HomePage() {
  return (
    <div className="h-full md:left-64 lg:left-64 md:w-[calc(100vw-21rem)] lg:w-[calc(100vw-21rem)] relative">
      <div className="absolute  bg-gradient-to-r from-gray-500 to-gray-900">
        <HeroSection />
        <MyServices />
        <WorkExperiences />
        {/* <BodyComponent /> */}
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
