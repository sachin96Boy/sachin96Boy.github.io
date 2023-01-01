import React from "react";

function Sidebar() {
  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-slate-900 border-slate-700">
      {/* profile picture with an active button */}
      <div className="flex flex-col items-center justify-between">
        <div className="inline-flex relative">
            <div className="absolute bottom-2 right-5 p-2 bg-green-500 rounded-full border-2 border-white"></div>
          <img
            className="w-44 h-44 mx-auto rounded-full p-1 border-2 border-slate-700"
            src="https://i.ibb.co/sVqvB3h/My-image.jpg"
            alt="profile"
          />
        </div>
        <div className="mt-6 text-center">
          <div className="text-2xl font-medium text-white my-2">
            Sachin Supunthaka
          </div>
          <div className="text-xs font-medium text-slate-400 mt-1">
            Full Stack Web and Mobile App Developer
          </div>
          <div className="text-xs font-medium text-slate-400 mt-1">
            Freelance 3D Animator
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
