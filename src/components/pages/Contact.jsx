import React from 'react'
import ContactMe from '../body-comp/ContactMe'

function Contact() {
  return (
    <div className="h-full md:left-64 lg:left-64 md:w-[calc(100vw-21rem)] lg:w-[calc(100vw-21rem)] relative">
    <div className="absolute m-0 right-0 left-0 lg:h-screen  bg-gradient-to-r from-gray-500 to-gray-900">
      <ContactMe />
    </div>
  </div>
  )
}

export default Contact