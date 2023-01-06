import React from "react";
import SachinBoy from "../model/SachinBoy";

function HeroSection() {
  return (
    <div className="overflow-hidden">
      <div className="flex">
        <div className="relative top-12 left-1/4">
          <div className="absolute">
            <h1 className="text-center my-5 text-white bg-green-900 font-bold text-5xl ">
              Web Developer
            </h1>
            <h1 className=" text-center my-5 text-white bg-green-900 font-bold text-5xl ">
              Mobile App Developer
            </h1>
            <h1 className="text-center my-5 text-white bg-green-900 font-bold text-5xl ">
              3D Animator
            </h1>
          </div>
        </div>
        <div className="box-border w-[calc(100vw-5rem)]">
          <SachinBoy />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
