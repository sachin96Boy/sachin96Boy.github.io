import { Button, Typography } from "@material-tailwind/react";
import { TbArrowWaveLeftDown } from "react-icons/tb";
import React from "react";
import { useNavigate } from "react-router";

function HeroText() {
  const navigate = useNavigate();
  const handleContact = () => {
    window.location = "mailto:sachinsupunthaka96@gmail.com";
  };
  const handlePortfolio = () => {
    navigate("/portfolio");
  };

  return (
    <div className="flex flex-col items-center mx-4 z-10">
      <div className="gap-4">
        <h1 className="text-center my-5 lg:ml-2 text-slate-200  font-bold text-5xl ">
          Web Developer
        </h1>
        <h1 className=" text-center my-5 lg:ml-12 text-slate-400  font-bold text-5xl ">
          Mobile App Developer
        </h1>
        <h1 className="text-center my-5 lg:ml-24 text-slate-300 outline-double border-2 border-slate-500  font-bold text-5xl ">
          3D Animator
        </h1>
      </div>
      <div className="flex mt-16 gap-4">
        <Button
          className="rounded-lg text-md outline-none text-slate-200 cursor-pointer"
          size="md"
          variant="gradient"
          color="blue-gray"
          ripple={true}
          onClick={handleContact}
        >
          Contact Me
        </Button>
        <div className="flex">
          <Button
            className="rounded text-lg text-slate-200 border-2 border-slate-600"
            size="md"
            variant="outlined"
            ripple={true}
            onClick={handlePortfolio}
          >
            Portfolio
          </Button>
        </div>
          <div className="relative">
            <div className="absolute flex -right-3 bottom-14">
            <TbArrowWaveLeftDown
              size={"64"}
              style={{
                color: "Background",
              }}
            />
            <Typography variant="paragraph" className="text-slate-300">
              Visit Me..
            </Typography>
            </div>
          </div>
      </div>
    </div>
  );
}

export default HeroText;
