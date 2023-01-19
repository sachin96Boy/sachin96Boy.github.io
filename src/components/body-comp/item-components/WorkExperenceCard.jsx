import { Typography } from "@material-tailwind/react";
import React from "react";
import { IoPeople } from "react-icons/io5";

function WorkExperenceCard(props) {
  const { company, position, duration, description } = props;
  return (
    <div className="items-start text-start p-4">
      <h1 className="text-xl font-black text-gray-80000 my-2">
        <span className="text-blue-gray-500">
          <IoPeople />
        </span>
        {company}
      </h1>
      <div className="flex justify-between">
        <h1 className="text-lg font-bold text-gray-200">{position}</h1>
        <h1 className="text-lg font-bold text-gray-700">{duration}</h1>
      </div>
      <Typography className="text-lg text-gray-300">{description}</Typography>
    </div>
  );
}

export default WorkExperenceCard;
