import React from "react";
import Logo from "./Logo";
import { BiMenuAltLeft } from "react-icons/bi";

function Header() {
  return (
    <div className="flex flex-row w-full items-center text-2xl px-5 justify-between bg-slate-800">
      <BiMenuAltLeft className="text-slate-200"/>
      <Logo />
    </div>
  );
}

export default Header;
