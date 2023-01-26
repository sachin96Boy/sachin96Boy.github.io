import { Chip } from "@material-tailwind/react";
import React from "react";
import { GiWorld } from "react-icons/gi";
import { ImGithub } from "react-icons/im";
import { Link } from "react-router-dom";

function ProjectCard({ name, tags, github }) {
  let TagList = tags.split(",");
  return (
    <div className="max-w-md p-8 shadow-lg rounded-lg my-20 bg-gradient-to-r from-slate-400 to-blue-gray-900 hover:transform hover:-translate-y-3 hover:ease-in">
      <div className="flex justify-center md:justify-end rounded-full p-3">
        {github ? <GiWorld className="bg-blue-gray-50 rounded-full text-cyan-900" size={"36"}/> : <ImGithub className="bg-slate-300 rounded-full text-slate-700" size={"36"}/>}
      </div>
      <div>
        <h2 className="text-slate-50 text-xl font-semibold">{name}</h2>
        {TagList.map((tag) => (
          <Chip className="mt-2 mx-4 border-2 border-slate-400 text-slate-900 bg-slate-300" value={tag} />
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <Link to={`/project/${name}`} class="text-lg font-medium text-slate-200">
          See More
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
