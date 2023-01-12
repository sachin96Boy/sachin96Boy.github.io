import React from "react";

function ItemCard(props) {
  let { title, description, icon } = props;
  return (
    <div className="bg-slate-200 rounded-lg my-2 border-gray-400 border-2">
      <div className="flex flex-col items-center justify-center m-2">
        <div className="flex items-center justify-center font-bold text-4xl">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-center">{title}</h1>
        </div>
        <div>
          <p className="text-center text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
