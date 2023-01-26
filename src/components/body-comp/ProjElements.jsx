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

  if (!loading) {
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

  return ProjContent;
}

export default ProjElements;
