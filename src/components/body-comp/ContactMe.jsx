import { Button } from "@material-tailwind/react";
import React from "react";

function ContactMe() {
  return (
    <div className="bg-contactbg bg-cover w-full h-full flex items-center justify-center">
      <div className="flex flex-col w-full items-center justify-center bg-blue-gray-200/50 backdrop-blur-sm py-12">
        <div className="text-center text-gray-100">
          <h1 className="font-bold text-4xl">Love to here from you</h1>
          <h2 className="font-bold text-2xl">Let's Get in Touch 👋</h2>
        </div>
        <Button
          className="px-16 text-lg font-bold my-2 text-gray-200 outline-2"
          variant="gradient"
          ripple={true}
          color="gray"
          onClick={()=>{
            window.location = 'mailto:sachinsupunthaka96@gmail.com'
          }}
        >
          contact
        </Button>
      </div>
    </div>
  );
}

export default ContactMe;
