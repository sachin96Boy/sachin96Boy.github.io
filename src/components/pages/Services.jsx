import React from "react";
import MyServices from "../body-comp/MyServices";

function Services() {
  return (
    <div className="h-full md:left-64 lg:left-64 md:w-[calc(100vw-21rem)] lg:w-[calc(100vw-21rem)] relative">
      <div className="absolute lg:h-screen  bg-gradient-to-r from-slate-500 to-slate-900">
        <MyServices />
      </div>
    </div>
  );
}

export default Services;
