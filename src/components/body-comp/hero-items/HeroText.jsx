import React from "react";

function HeroText() {
  return (
    <div className="flex flex-col mx-4">
      <h1 className="text-center my-5 lg:ml-2 text-gray-200  font-bold text-5xl ">
        Web Developer
      </h1>
      <h1 className=" text-center my-5 lg:ml-12 text-gray-400  font-bold text-5xl ">
        Mobile App Developer
      </h1>
      <h1 className="text-center my-5 lg:ml-24 text-gray-500 outline-double border-2 border-gray-500  font-bold text-5xl ">
        3D Animator
      </h1>
    </div>
  );
}

export default HeroText;
