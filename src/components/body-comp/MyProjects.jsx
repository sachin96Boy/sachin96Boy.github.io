import React, { useState } from "react";
import { useEffect } from "react";
import ProjectCard from "./item-components/ProjectCard";
import Spinner from "./item-components/Spinner";
import axios from "axios";

function MyProjects() {
  const [projects, setProjects] = useState();
  const [social, setSocial] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .all([
        axios.get(`${import.meta.env.VITE_DATABASE_URL}Projects.json`),
        axios.get(`${import.meta.env.VITE_DATABASE_URL}social.json`),
      ])
      .then(
        axios.spread((res1, res2) => {
          setProjects(res1.data);
          setSocial(res2.data);
          setLoading(false);
        })
      )
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
    <div className="flex flex-col w-full items-center min-h-screen">
      <div className="pt-4">
        <h1 className="text-3xl font-black text-slate-300">
          My Portfolio Projects
        </h1>
      </div>
      <div className="text-2xl text-slate-300 text-center">
        Check out my 3D Animation Works on{" "}
        <a href={social?.fiverr}>
          <span className="text-green-500 font-black text-3xl">Fiverr</span>
        </a>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 items-center mx-4">
        {projectExperience}
      </div>
    </div>
  );
}

export default MyProjects;
