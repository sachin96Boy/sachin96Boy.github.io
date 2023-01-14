import React from 'react'
import WorkExperiences from '../body-comp/WorkExperiences'

function WorkHistory() {
  return (
    <div className="h-full md:left-64 lg:left-64 md:w-[calc(100vw-21rem)] lg:w-[calc(100vw-21rem)] relative">
    <div className="absolute lg:h-screen  bg-gradient-to-r from-slate-500 to-slate-900">
      <WorkExperiences />
    </div>
  </div>
  )
}

export default WorkHistory