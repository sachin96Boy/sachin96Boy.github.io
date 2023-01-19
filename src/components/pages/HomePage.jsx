import React from "react";
import HeroSection from "../body-comp/HeroSection";
import MyServices from "../body-comp/MyServices";
import WorkExperiences from "../body-comp/WorkExperiences";
import Footer from "../footer/Footer";
import ContactMe from "../body-comp/ContactMe";

function HomePage() {
  return (
    <div className="h-full w-screen md:left-64 lg:left-64 md:w-[calc(100vw-21rem)] lg:w-[calc(100vw-21rem)] relative">
      <div className="absolute m-0 right-0 left-0  bg-gradient-to-r from-gray-500 to-gray-900">
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
