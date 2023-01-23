import React from 'react'
import ContactMe from '../body-comp/ContactMe'

function Contact() {
  return (
    <div className="h-full w-full lg:left-64  lg:w-[calc(100vw-21rem)] relative">
    <div className="absolute h-screen m-0 right-0 left-0 lg:h-screen  bg-gradient-to-r from-slate-400 to-slate-900">
      <ContactMe />
    </div>
  </div>
  )
}

export default Contact