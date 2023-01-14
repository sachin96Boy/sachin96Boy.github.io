import React from 'react'
import WorkExperiences from '../body-comp/WorkExperiences'

function WorkHistory() {
  return (
    <div className="h-full left-64 w-[calc(100vw-21rem)] relative">
    <div className="absolute h-screen  bg-gradient-to-r from-slate-500 to-slate-900">
      <WorkExperiences />
    </div>
  </div>
  )
}

export default WorkHistory