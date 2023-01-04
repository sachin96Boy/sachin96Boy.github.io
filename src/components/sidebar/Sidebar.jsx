import React from "react";
import {
  BsDownload,
  BsFacebook,
  BsGithub,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";
import { Link } from "react-router-dom";

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
          <div className="text-sm font-medium text-slate-400 mt-1">
            Full Stack Web and Mobile App Developer
          </div>
          <div className="text-sm font-medium text-slate-400 mt-1">
            Freelance 3D Animator
          </div>
        </div>
      </div>
      {/* list of social media set */}
      <div className="flex flex-row justify-center mt-6">
        <Link href="https://www.facebook.com/Sachin96boy">
          <BsFacebook className="w-6 h-6 mr-3 text-slate-400 hover:text-slate-100" />
        </Link>
        <Link href="https://www.linkedin.com/in/sachin-supunthaka-9b5b3b1b3/">
          <BsLinkedin className="w-6 h-6 mr-3 text-slate-400 hover:text-slate-100" />
        </Link>
        <Link href="https://www.twitter.com/SACHINSUPUNTHAK">
          <BsTwitter className="w-6 h-6 mr-3 text-slate-400 hover:text-slate-100" />
        </Link>
        <Link href="https://www.github.com/Sachin96Boy">
          <BsGithub className="w-6 h-6 mr-3 text-slate-400 hover:text-slate-100" />
        </Link>
      </div>
      {/* personal info section */}
      <div className="flex flex-col mt-10">
        <div className="flex flex-row items-center py-2 px-4 rounded-lg text-slate-100 bg-slate-800">
          <div className="flex flex-col">
            <div className="text-md font-medium my-1">Education</div>
            <div className="text-sm font-medium text-slate-400">
              BSc in Computer Science
            </div>
            <div className="text-xs font-medium text-slate-400">
              Wayamba University of Sri Lanka
            </div>
            <div className="text-md font-medium my-1">Country</div>
            <div className="text-sm font-medium text-slate-400">Sri Lanka</div>
          </div>
        </div>
      </div>

      {/* sidebar menu */}
      <div className="flex flex-col mt-10">
        <div className="flex flex-row items-center py-2 px-4 rounded-lg text-slate-100 bg-slate-800">
          {/* language profiency ith progressBar */}
          <div className="flex flex-col">
            <div className="text-md font-medium my-1">Language Profiency</div>
            <div className="text-sm font-medium text-slate-400">English</div>
            <div className="text-sm font-medium text-slate-400">Sinhala</div>
          </div>
        </div>
      </div>
      {/* download cv button */}
      <div className="flex flex-col mt-10">
        <div className="flex flex-col">
          <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded border border-dotted border-white">
            <div className="flex flex-row items-center justify-between">
              Download CV
              <BsDownload className="w-6 h-6 mr-3 text-slate-400 hover:text-slate-100" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
