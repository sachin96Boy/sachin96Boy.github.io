import React from "react";
import { IoPeople } from "react-icons/io5";

function WorkExperenceCard(props) {
  const { company, position, duration, description } = props;
  return (
    <div className="text-start p-4">
      <h1 className="text-xl font-black text-slate-80000 my-2">
        <span className="text-slate-500">
          <IoPeople />
        </span>
        {company}
      </h1>
      <div className="flex justify-between">
        <h1 className="text-lg font-bold text-slate-600">{position}</h1>
        <h1 className="text-lg font-bold text-gray-700">{duration}</h1>
      </div>
      <p className="text-lg text-slate-700">{description}</p>
    </div>
  );
}

export default WorkExperenceCard;
