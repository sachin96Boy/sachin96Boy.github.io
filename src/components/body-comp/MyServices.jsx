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
        "I am experienced in Full Stack web development, which include the use of Javascript, HTML, CSS, and back-end technologies like NodeJs and Python. I offer website development services for small businesses, Blogs, E-commerce, and startup projects.",
      icon: <GrPersonalComputer />,
    },
    {
      title: "Mobile App Development",
      description:
        "I am also experienced in Mobile App development using React Native and Flutter. I have developed many mobile apps for small businesses and startups.",
      icon: <BiMobileAlt />,
    },
    {
      title: "3D Animation",
      description:
        "I am also experienced in 3D Animation and 3D Modeling. I have worked on many 3D projects for small businesses and startups.",
      icon: <GiCubes />,
    },
    {
      title: "Digital potrait painting",
      description:
        "I create Digital potrait patings using Adobe illustraitor and Photoshop. I have worked on many 3D projects for small businesses and startups.",
      icon: <BiPaint />,
    },
    {
      title: "Game Development",
      description:
        "I develop games using Unity3D and Unreal Engine. I have worked on many 3D projects for small businesses and startups.",
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
          "I am experienced in Full Stack web development, which include the use
          of Javascript, HTML, CSS, and back-end technologies like NodeJs and
          Python. I offer website development services for small businesses,
          Blogs, E-commerce, and startup projects.
        </div>
        <div className="flex flex-row justify-center text-slate-300 text-md font-bold my-2">
          I am also experienced in Mobile App development using React Native and
          Flutter. I have developed many mobile apps for small businesses and
          startups.
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
