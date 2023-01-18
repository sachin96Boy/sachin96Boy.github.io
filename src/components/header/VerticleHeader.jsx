import React from "react";
import { FaHome } from "react-icons/fa";
import {
  MdHomeWork,
  MdOutlineMiscellaneousServices,
  MdPermContactCalendar,
} from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { SiAngellist } from "react-icons/si";
import { GiAngelOutfit } from "react-icons/gi";
import { Navbar, Tooltip, Typography } from "@material-tailwind/react";

function VerticleHeader() {
  let [isOpenHeader, setIsOpenHeader] = React.useState(false);

  const toggleSidebar = () => {
    setIsOpenHeader(!isOpenHeader);
  };

  let content = (
    <>
      <div className="flex justify-start m-6 rounded-full bg-gray-700 p-2 md:hidden lg:hidden">
        <SiAngellist className="w-6 h-6 text-white" onClick={toggleSidebar} />
      </div>
      <header className="hidden md:flex lg:flex w-20 flex-col h-screen px-4 bg-gray-900 border-gray-700 justify-center">
        <nav>
          <ul className="flex flex-col items-center justify-center my-16  gap-8">
            <li>
              <Tooltip content="Home" placement="top">
                <Link to="/">
                  <div className="bg-gray-700 rounded-full p-2 hover:bg-gray-400">
                    <FaHome className="w-6 h-6 text-white hover:text-gray-100" />
                  </div>
                </Link>
              </Tooltip>
            </li>
            <li>
              <Tooltip content="services" placement="top">
                <Link to="/services">
                  <div className="bg-gray-700 rounded-full p-2 hover:bg-gray-400">
                    <MdOutlineMiscellaneousServices className="w-6 h-6 text-white hover:text-gray-100" />
                  </div>
                </Link>
              </Tooltip>
            </li>
            <li>
              <Tooltip content="projects" placement="top">
                <Link to="/projects">
                  <div className="bg-gray-700 rounded-full p-2 hover:bg-gray-400">
                    <IconContext.Provider
                      value={{
                        color: "white",
                      }}
                    >
                      <GrProjects className="w-6 h-6 text-white hover:text-gray-100" />
                    </IconContext.Provider>
                  </div>
                </Link>
              </Tooltip>
            </li>
            <li>
              <Tooltip content="work history" placement="top">
                <Link to="/workhistory">
                  <div className="bg-gray-700 rounded-full p-2 hover:bg-gray-400">
                    <MdHomeWork className="w-6 h-6 text-white hover:text-gray-100" />
                  </div>
                </Link>
              </Tooltip>
            </li>
            <li>
              <Tooltip content="Contact" placement="top">
                <Link to="/contact">
                  <div className="bg-gray-700 rounded-full p-2 hover:bg-gray-400">
                    <MdPermContactCalendar className="w-6 h-6 text-white hover:text-gray-100" />
                  </div>
                </Link>
              </Tooltip>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );

  if (isOpenHeader) {
    content = (
      <>
        <div className="relative">
          <div className="flex m-6 absolute justify-start rounded-full bg-gray-700 p-2 md:hidden lg:hidden">
            <GiAngelOutfit
              className="w-6 h-6 text-red-500"
              onClick={toggleSidebar}
            />
          </div>
        </div>
        <header className="flex w-20 flex-col h-screen px-4 bg-gray-900 border-gray-700 justify-center">
          <Navbar>
            <ul className="flex flex-col items-center justify-center my-16  gap-8">
              <ul>
                <Tooltip content="Material Tailwind">
                  <Link to="/">
                    <div className="bg-gray-700 rounded-full p-2 hover:bg-gray-400">
                      <FaHome className="w-6 h-6 text-white hover:text-gray-100" />
                    </div>
                  </Link>
                </Tooltip>
              </ul>
              <li>
                <Link to="/services">
                  <div className="bg-gray-700 rounded-full p-2 hover:bg-gray-400">
                    <MdOutlineMiscellaneousServices className="w-6 h-6 text-white hover:text-gray-100" />
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/projects">
                  <div className="bg-gray-700 rounded-full p-2 hover:bg-gray-400">
                    <IconContext.Provider
                      value={{
                        color: "white",
                      }}
                    >
                      <GrProjects className="w-6 h-6 text-white hover:text-gray-100" />
                    </IconContext.Provider>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/workhistory">
                  <div className="bg-gray-700 rounded-full p-2 hover:bg-gray-400">
                    <MdHomeWork className="w-6 h-6 text-white hover:text-gray-100" />
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <div className="bg-gray-700 rounded-full p-2 hover:bg-gray-400">
                    <MdPermContactCalendar className="w-6 h-6 text-white hover:text-gray-100" />
                  </div>
                </Link>
              </li>
            </ul>
          </Navbar>
        </header>
      </>
    );
  }

  return content;
}

export default VerticleHeader;
