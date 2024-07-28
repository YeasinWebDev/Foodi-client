import React from 'react'
import Hero from '../components/Home/Hero'
import Catagorie from '../components/Home/Catagorie'
import Dishes from '../components/Home/Dishes'
import Review from '../components/Home/Review'

function Home() {
  return (
    <div>
      <Hero/>
      <Catagorie/>
      <Dishes/>
      <Review/>
    </div>
  )
}

export default Home