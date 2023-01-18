import React from "react";

function ItemCard(props) {
  let { title, description, icon } = props;
  return (
    <div className="bg-gray-200 rounded-lg my-2 border-gray-400 border-2">
      <div className="flex flex-col items-center justify-center m-2">
        <div className="flex items-center justify-center font-bold text-4xl">
          {icon}
        </div>
        <div>
          <h1 className="text-md lg:text-2xl font-bold text-center hidden md:block lg:block">{title}</h1>
        </div>
        <div>
          <p className="text-center text-gray-600 hidden md:block lg:block ">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
