import React, { useState } from "react";
import { useEffect } from "react";
import ProjectCard from "./item-components/ProjectCard";
import Spinner from "./item-components/Spinner";
import axios from "axios";

function MyProjects() {
  const [projects, setProjects] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_DATABASE_URL}Projects.json`)
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let projectExperience = <Spinner />;

  if (!loading) {
    projectExperience = projects.map((project, index) => {
      return <ProjectCard key={index} {...project} />;
    });
  }

  return (
    <div className="flex flex-col w-full items-center">
      <div className="pt-4">
        <h1 className="text-3xl font-black text-slate-300">My Portfolio Projects</h1>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 items-center">
        {projectExperience}
      </div>
    </div>
  );
}

export default MyProjects;
