import React from "react";
import HeroSection from "../body-comp/HeroSection";
import BodyComponent from "../body-comp/BodyComponent";
import MyServices from "../body-comp/MyServices";

function HomePage() {
  return (
    <div className="h-full left-64 w-[calc(100vw-22rem)] relative bg-gradient-to-r from-slate-400 to-slate-900">
      <div className="absolute  bg-gradient-to-r from-slate-400 to-slate-900">
        <HeroSection />
        <MyServices />
        <BodyComponent />
      </div>
    </div>
  );
}

export default HomePage;
