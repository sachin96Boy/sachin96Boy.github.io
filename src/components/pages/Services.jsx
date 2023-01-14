import React from "react";
import MyServices from "../body-comp/MyServices";

function Services() {
  return (
    <div className="h-full left-64 w-[calc(100vw-21rem)] relative">
      <div className="absolute h-screen  bg-gradient-to-r from-slate-500 to-slate-900">
        <MyServices />
      </div>
    </div>
  );
}

export default Services;
