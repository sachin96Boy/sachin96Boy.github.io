import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { BiMenuAltLeft } from "react-icons/bi";
import {
  BsDownload,
  BsFacebook,
  BsGithub,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

import firebaseApp from "../firebase/firebase";
import axios from "axios";

function Header() {
  const storage = getStorage(firebaseApp);

  const [isOpenHeader, setIsOpenHeader] = React.useState(false);
  const [socialDetails, setSocialDetails] = useState();
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setIsOpenHeader(!isOpenHeader);
  };

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
    `${import.meta.env.VITE_STORAGE_BUCKT_URL}/sachinsupunthaka.pdf`
  );

  const handleDownload = async() => {
    await getDownloadURL(pathReference)
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

  let headerContent = (
    <div className="flex sticky top-0 flex-row w-full items-center text-2xl px-5 justify-between bg-slate-800 py-3">
      <BiMenuAltLeft className="text-slate-200" onClick={toggleSidebar} />
      <Logo />
    </div>
  );

  if (isOpenHeader) {
    headerContent = (
      <div className="flex flex-col bg-slate-900 w-full z-50 py-3  top-0 bottom-0 fixed overflow-y-scroll overflow-x-hidden">
        <div className="flex flex-row items-center text-2xl px-5 justify-between">
          <AiOutlineClose className="text-slate-200" onClick={toggleSidebar} />
          <Logo />
        </div>
        <div className="mx-5">
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
            <div className="text-center">
              <div className="text-2xl font-medium text-white my-2">
                Sachin Supunthaka
              </div>
              <div className="text-sm font-medium text-slate-400">
                Full Stack Web and Mobile App Developer
              </div>
              <div className="text-sm font-medium text-slate-400">
                Freelance 3D Animator
              </div>
            </div>
          </div>
          {/* list of social media set */}
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex flex-row justify-center mt-5">
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
      </div>
    );
  }

  return headerContent;
}

export default Header;
