import React from "react";
import MyProjects from "../body-comp/MyProjects";

function PortFolio() {
  return (
    <div className="h-full w-full lg:left-64 lg:w-[calc(100vw-21rem)] relative">
      <div className="absolute m-0 right-0 left-0 bg-gradient-to-r from-slate-400 to-slate-900">
        <MyProjects />
      </div>
    </div>
  );
}

export default PortFolio;
