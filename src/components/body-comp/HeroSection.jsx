import React from "react";
import SachinBoy from "../model/SachinBoy";
import HeroText from "./hero-items/HeroText";

function HeroSection() {
  return (
    <div className="overflow-hidden h-4/5">
      <div className="flex">
        <HeroText />
        <div className="box-border w-full filter-none">
          <SachinBoy />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
