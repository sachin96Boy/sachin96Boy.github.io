import { Typography } from "@material-tailwind/react";
import React from "react";
import { IoPeople } from "react-icons/io5";

function WorkExperenceCard(props) {
  const { company, position, duration, description } = props;
  return (
    <div className="items-start text-start p-4">
      <h1 className="text-xl font-black text-slate-800 my-2">
        <span className="text-blue-slate-500">
          <IoPeople />
        </span>
        {company}
      </h1>
      <div className="flex justify-between">
        <h1 className="text-lg font-bold text-slate-100">{position}</h1>
        <h1 className="text-lg font-bold text-slate-700">{duration}</h1>
      </div>
      <Typography className="text-lg text-slate-300">{description}</Typography>
    </div>
  );
}

export default WorkExperenceCard;
