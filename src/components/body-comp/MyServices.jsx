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
      description: "Mobile app Dev Using Dart and Flutter",
      icon: <BiMobileAlt />,
    },
    {
      title: "3D Animation",
      description: "3D animation design using Blender and Iclone.",
      icon: <GiCubes />,
    },
    {
      title: "Digital potrait painting",
      description: "Adobe Illustrator and Adobe Photoshop",
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
      <div className="flex flex-col items-center justify-between p-4">
        <h1 className="text-4xl font-bold text-center text-slate-100 mb-6">
          My Services
        </h1>
        <div className="flex gap-2 flex-row justify-center text-slate-300 text-md font-bold my-2">
          I’m an experienced Full-Stack Web Developer skilled in JavaScript,
          HTML, CSS, and modern frameworks like React and Next.js, combined with
          backend technologies such as Node.js and Python. I specialize in
          building dynamic, responsive websites for small businesses, blogs,
          e-commerce platforms, and startup projects. <br></br>In addition to
          web development, I’m also proficient in Mobile App Development using
          Flutter. I’ve developed numerous mobile applications for both solo
          projects and small businesses, focusing on performance, user
          experience, and clean design.<br></br> My skill set also extends to
          the world of 3D Animation and 3D Modeling. I’ve successfully delivered
          multiple 3D projects for startups and business clients, helping them
          bring their ideas to life with high-quality visuals and animations.{" "}
          <br></br> Whether you're looking to build a digital presence, develop
          a mobile solution, or create stunning 3D visuals—I can help bring your
          vision to reality.
        </div>
        <div className="grid grid-cols-3 gap-3 bg-slate-400/50 p-4 rounded-lg backdrop-blur-sm">
          {services.map((service, index) => {
            return <ItemCard key={index} {...service} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default MyServices;
