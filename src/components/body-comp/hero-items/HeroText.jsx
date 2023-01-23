import { Button, Typography } from "@material-tailwind/react";
import { TbArrowWaveLeftDown } from "react-icons/tb";
import React from "react";

function HeroText() {
  return (
    <div className="flex flex-col mx-4">
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
      <div className="flex w-full justify-center gap-4 mt-12 lg:mt-24 ml-4">
        <Button
          className="rounded-lg text-md text-slate-300"
          color="blue-gray"
          variant="gradient"
          size="md"
          ripple={true}
        >
          Contact Me
        </Button>
        <div className="flex">
          <Button
            className="rounded text-lg text-slate-300"
            size="md"
            variant="outlined"
            color="blue-gray"
            ripple={true}
          >
            Portafolio
          </Button>
          <div className="relative flex right-6 bottom-12"><TbArrowWaveLeftDown
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
