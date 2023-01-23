import React, { useEffect, useState } from "react";
import WorkExperenceCard from "./item-components/WorkExperenceCard";
import axios from "axios";
import Spinner from "./item-components/Spinner";

function WorkExperiences() {
  const [work, setWork] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_DATABASE_URL}workExperience.json`)
      .then((res) => {
        setWork(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let experiencedData = <Spinner />;

  if (!loading) {
    experiencedData = work.map((workExperience, index) => {
      return <WorkExperenceCard key={index} {...workExperience} />;
    });
  }

  return (
    <div className="w-full h-full bg-cover rounded-sm">
      <div className="flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
        <div className="w-1/4 h-full  bg-opacity-50">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl font-bold text-slate-100">
              Work Experiences
            </h1>
          </div>
        </div>
        <div className="w-3/4 bg-slate-300/20 backdrop-blur-sm rounded-md">
          <div className="backdrop-blur-sm">
            <div className="flex flex-col  justify-center h-full">
              {experiencedData}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkExperiences;
