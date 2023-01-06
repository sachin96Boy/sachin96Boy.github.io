import React from 'react'
import HeroSection from '../body-comp/HeroSection'
import BodyComponent from '../body-comp/BodyComponent'


function HomePage() {
  return (
    <div className='w-full'>
        <HeroSection />
        <BodyComponent />
    </div>
  )
}

export default HomePage