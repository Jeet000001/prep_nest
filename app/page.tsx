import FeaturesSection from '@/Components/landing_page/FeaturesSection'
import Hero from '@/Components/landing_page/Hero'
import ProblemSection from '@/Components/landing_page/RealProblem'
import WhyThisExists from '@/Components/landing_page/WhyThisExistsSection'
import React from 'react'

const page = () => {
  return (
    <div>
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <WhyThisExists />
    </div>
  )
}

export default page