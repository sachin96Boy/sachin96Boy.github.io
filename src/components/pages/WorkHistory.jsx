import React from "react";
import WorkExperiences from "../body-comp/WorkExperiences";

function WorkHistory() {
  return (
    <div className="h-full w-full lg:left-64 lg:w-[calc(100vw-21rem)] relative">
      <div className="absolute min-h-screen m-0 right-0 left-0 lg:h-screen  bg-gradient-to-r from-gray-700 to-gray-900">
        <WorkExperiences />
      </div>
    </div>
  );
}

export default WorkHistory;
