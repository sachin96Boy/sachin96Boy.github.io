import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div>
      <Link to={"/"}>
        <div className="text-slate-200 font-bold text-center">Sachin96Boy</div>
      </Link>
    </div>
  );
}

export default Logo;
