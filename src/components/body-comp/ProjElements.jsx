import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Spinner from "./item-components/Spinner";
import { Button, Chip } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from "react-icons/ai";

function ProjElements(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const projId = location.pathname.split("/project/")[1];

  const [project, setProject] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_DATABASE_URL}Projects.json`)
      .then((res) => {
        setProject(res.data.find((project) => project.id === projId));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const visitHandler = () => {
    window.open(project.Refference);
  };

  const handleBack = () => {
    navigate("/portfolio");
  };

  let ProjContent = <Spinner />;
  let projImgPath = "../../imageAssets/Night-sky-Image.webp";

  if (project && !loading) {
    ProjContent = (
      <>
        <div
          onClick={handleBack}
          className="flex items-center justify-center lg:justify-start m-4 py-2 font-bold cursor-pointer text-slate-200"
        >
          <AiOutlineArrowLeft className="text-slate-50 text-xl mx-2" />
          <h2 className="font-black text-center text-xl">Go Back</h2>
        </div>
        <div className="flex flex-col items-center  justify-center my-4 h-full md:min-h-screen">
          <div className="flex my-2">
            <h1 className="font-bold text-slate-200 text-xl">{project.name}</h1>
          </div>
          <div>
            <img
              className="h-auto max-w-xs lg:max-w-md rounded-lg shadow-xl shadow-gray-800"
              src={project.imgPath ? project.imgPath : projImgPath}
              alt={project.name}
            />
          </div>
          <div className="flex flex-col md:flex-row my-4">
            {project.tags.split(",").map((tag, index) => (
              <Chip
                key={index}
                className="my-2 mx-4 border-2 border-slate-400 text-slate-900 bg-slate-300"
                value={tag}
              />
            ))}
          </div>
          <div className="mx-4 my-4">
            <p className="text-lg text-center text-slate-300">
              {project.description}
            </p>
          </div>
          <div className="my-4">
            <Button color="amber" onClick={visitHandler}>
              Visit Project
            </Button>
          </div>
        </div>
      </>
    );
  }

  if (project === undefined && !loading) {
    ProjContent = (
      <div className="w-full my-12 flex flex-col items-center text-slate-200 h-screen">
        <h1 className="text-3xl text-center">Item Not Found</h1>
        <div
          onClick={handleBack}
          className="flex items-center justify-center lg:justify-start m-4 py-2 font-bold cursor-pointer text-slate-200"
        >
          <AiOutlineArrowLeft className="text-slate-50 text-xl mx-2" />
          <h2 className="font-black text-center text-xl">Go Back</h2>
        </div>
      </div>
    );
  }

  return <div className="min-h-screen">{ProjContent}</div>;
}

export default ProjElements;
