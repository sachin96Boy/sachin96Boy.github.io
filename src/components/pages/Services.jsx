import React from "react";
import MyServices from "../body-comp/MyServices";

function Services() {
  return (
    <div className="h-full w-full lg:left-64 lg:w-[calc(100vw-21rem)] relative">
      <div className="absolute min-h-screen m-0 right-0 left-0 lg:h-screen  bg-gradient-to-r from-slate-400 to-slate-900">
        <MyServices />
      </div>
    </div>
  );
}

export default Services;
