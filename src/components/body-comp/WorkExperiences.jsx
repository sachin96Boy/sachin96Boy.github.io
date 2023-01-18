import React from "react";
import WorkExperenceCard from "./item-components/WorkExperenceCard";

function WorkExperiences() {
  let workExperiences = [
    {
      id: 1,
      company: "Axotn Innoations",
      position: "Frontend Developer Intern",
      duration: "Jan 2021 - June 2021",
      description:
        "Develop and maintain the frontend of the company's Projects and exposure to MERN stack",
    },
    {
      id: 2,
      company: "Elephant Hive",
      position: "Full Stack Developer Intern",
      duration: "January 2022 - December 2022",
      description:
        "Develop and Maintain the company's Website, Design the Backend and Functionality of the Website, Manage Azure Cloud Services, and also Develop and Maintain the company's chrome extension",
    },
  ];
  return (
    <div className="w-full h-full bg-service bg-cover rounded-sm">
      <div className="flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
        <div className="w-1/2 h-full  bg-opacity-50">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl font-bold text-gray-100">
              Work Experiences
            </h1>
          </div>
        </div>
        <div className="w-3/4 bg-white/30 backdrop-blur-lg rounded-md">
          <div className="backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center h-full">
              {workExperiences.map((workExperience, index) => {
                return <WorkExperenceCard key={index} {...workExperience} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkExperiences;
