import React from "react";
import { GrPersonalComputer, GrGamepad } from "react-icons/gr";
import { BiMobileAlt, BiPaint } from "react-icons/bi";
import { GiCubes } from "react-icons/gi";
import ItemCard from "./item-components/ItemCard";

function MyServices() {
  let services = [
    {
      title: "Web Development",
      description:
        "FrontEnd Development Using React and NextJs and BackEnd Development Using NodeJs and Python.",
      icon: <GrPersonalComputer />,
    },
    {
      title: "Mobile App Development",
      description:
        "Mobile app Dev Using Dart and Flutter",
      icon: <BiMobileAlt />,
    },
    {
      title: "3D Animation",
      description:
        "3D animation design using Blender and Iclone.",
      icon: <GiCubes />,
    },
    {
      title: "Digital potrait painting",
      description:
        "Adobe Illustrator and Adobe Photoshop",
      icon: <BiPaint />,
    },
    {
      title: "Game Development",
      description:
        "Game Development Using Unity and C#, and also using Unreal Engine and C++",
      icon: <GrGamepad />,
    },
  ];
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-center text-white mb-6">
          My Services
        </h1>
        <div className="flex flex-row justify-center text-slate-300 text-md font-bold my-2">
          I am experienced in Full Stack web development, which include the use
          of Javascript, HTML, CSS, and also modern solutions like React and NextJs and back-end technologies like NodeJs and
          Python. I offer website development services for small businesses,
          Blogs, E-commerce, and startup projects.
        </div>
        <div className="flex flex-row justify-center text-slate-300 text-md font-bold my-2">
          I am also experienced in Mobile App development using 
          Flutter. I have developed many mobile apps for small businesses and as solo Projects.
        </div>
        <div className="flex flex-row justify-center text-slate-300 text-md font-bold my-2">
          I am also experienced in 3D Animation and 3D Modeling. I have worked
          on many 3D projects for small businesses and startups.
        </div>
        <div className="grid grid-cols-3 gap-3 bg-slate-400 p-4 rounded-lg">
          {services.map((service, index) => {
            return <ItemCard key={index} {...service} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default MyServices;
