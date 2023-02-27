import React, { useEffect, useState } from "react";
import {
  BsDownload,
  BsFacebook,
  BsGithub,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";
import firebaseApp from "../../firebase/firebase";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

import { AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";
import Spinner from "../body-comp/item-components/Spinner";

function Sidebar(props) {
  const storage = getStorage(firebaseApp);

  const [isOpen, setIsOpen] = useState(false);
  const [socialDetails, setSocialDetails] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_DATABASE_URL}social.json`)
      .then((res) => {
        setSocialDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const pathReference = ref(
    storage,
    `${import.meta.env.VITE_STORAGE_BUCKT_URL}/M.G.S Supunthaka.pdf`
  );

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    props.setIsDark(!props.isDark);
  };

  const handleDownload = () => {
    getDownloadURL(pathReference)
      .then((url) => {
        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
      })
      .catch((err) => {
        console.log(err);
        switch (err.code) {
          case "storage/object-not-found":
            // File doesn't exist
            break;
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  };

  let content = (
    <>
      {/* <div className="flex justify-start m-4 rounded-full bg-slate-700 p-2 lg:hidden md:overflow-auto">
        <RxHamburgerMenu
          className="w-8 h-8 text-white"
          onClick={toggleSidebar}
        />
      </div> */}
      <div className="hidden lg:flex flex-col w-screen md:w-64 lg:w-64 h-screen  px-4 py-2 bg-slate-900 border-slate-700 border-r-4">
        {/* hanburger Menu close button */}
        <div className="flex justify-start md:hidden lg:hidden">
          <AiOutlineClose
            className="w-8 h-8 text-white"
            onClick={toggleSidebar}
          />
        </div>

        {/* profile picture with an active button */}
        <div className="flex flex-col items-center justify-between">
          <div className="inline-flex relative">
            <div className="absolute bottom-2 right-5 p-2 bg-green-500 rounded-full border-2 border-white"></div>
            <img
              className="w-44 h-44 mx-auto rounded-full p-1 border-2 border-slate-700"
              src="https://i.ibb.co/tM0THCd/My-image.webp"
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
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-row justify-center mt-6">
            <a href={socialDetails.facebook} type="button">
              <BsFacebook className="w-6 h-6 mr-3 text-slate-400 hover:text-slate-100" />
            </a>
            <a href={socialDetails.linkdin}>
              <BsLinkedin className="w-6 h-6 mr-3 text-slate-400 hover:text-slate-100" />
            </a>
            <a href={socialDetails.twitter}>
              <BsTwitter className="w-6 h-6 mr-3 text-slate-400 hover:text-slate-100" />
            </a>
            <a href={socialDetails.github}>
              <BsGithub className="w-6 h-6 mr-3 text-slate-400 hover:text-slate-100" />
            </a>
          </div>
        )}
        {/* personal info section */}
        <div className="flex flex-col mt-5">
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
              <div className="text-sm font-medium text-slate-400">
                Sri Lanka
              </div>
            </div>
          </div>
        </div>

        {/* sidebar menu */}
        <div className="flex flex-col mt-5">
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
        <div className="flex flex-col mt-5">
          <div className="flex flex-col">
            <button
              onClick={handleDownload}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded border border-dotted border-white"
            >
              <div className="flex flex-row items-center justify-between">
                Download CV
                <BsDownload className="w-6 h-6 mr-3 text-slate-400 hover:text-slate-100" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );

  if (isOpen) {
    content = (
      <>
        {/* hanburger Menu close button */}
        <div className="relative">
          <div className="flex m-4 absolute justify-start rounded-full bg-slate-700 p-2 lg:hidden">
            <AiOutlineClose
              className="w-8 h-8 text-white"
              onClick={toggleSidebar}
            />
          </div>
        </div>
        <div className="flex flex-col w-screen h-screen md:w-64 lg:w-64 lg:h-screen px-4 py-4 bg-slate-900 border-slate-700 border-r-4">
          {/* profile picture with an active button */}
          <div className="flex flex-col items-center justify-between">
            <div className="inline-flex relative">
              <div className="absolute bottom-2 right-3 p-2 bg-green-500 rounded-full border-2 border-white"></div>
              <img
                className="w-28 h-28 mx-auto rounded-full p-1 border-2 border-slate-700"
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
          <div className="flex flex-row justify-center mt-3">
            <a dir="https://www.facebook.com/Sachin96boy">
              <BsFacebook className="w-6 h-6 mr-3 text-slate-400 hover:text-slate-100" />
            </a>
            <a href="https://www.linkedin.com/in/sachin-supunthaka-9b5b3b1b3/">
              <BsLinkedin className="w-6 h-6 mr-3 text-slate-400 hover:text-slate-100" />
            </a>
            <a href="https://www.twitter.com/SACHINSUPUNTHAK">
              <BsTwitter className="w-6 h-6 mr-3 text-slate-400 hover:text-slate-100" />
            </a>
            <a href="https://www.github.com/Sachin96Boy">
              <BsGithub className="w-6 h-6 mr-3 text-slate-400 hover:text-slate-100" />
            </a>
          </div>
          {/* personal info section */}
          <div className="flex flex-col mt-5">
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
                <div className="text-sm font-medium text-slate-400">
                  Sri Lanka
                </div>
              </div>
            </div>
          </div>

          {/* sidebar menu */}
          <div className="flex flex-col mt-5">
            <div className="flex flex-row items-center py-2 px-4 rounded-lg text-slate-100 bg-slate-800">
              {/* language profiency ith progressBar */}
              <div className="flex flex-col">
                <div className="text-md font-medium my-1">
                  Language Profiency
                </div>
                <div className="text-sm font-medium text-slate-400">
                  English
                </div>
                <div className="text-sm font-medium text-slate-400">
                  Sinhala
                </div>
              </div>
            </div>
          </div>
          {/* download cv button */}
          <div className="flex flex-col mt-5">
            <div className="flex flex-col">
              <button
                onClick={handleDownload}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded border border-dotted border-white"
              >
                <div className="flex flex-row items-center justify-between">
                  Download CV
                  <BsDownload className="w-6 h-6 mr-3 text-slate-400 hover:text-slate-100" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return content;
}

export default Sidebar;
