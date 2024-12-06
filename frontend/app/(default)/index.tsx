"use client"

import CTASection from "@/components/sections/CTASection"
import FeaturesSection from "@/components/sections/FeaturesSection"
import HeroSection from "@/components/sections/HeroSection"
import PricingSection from "@/components/sections/PricingSection"
import TestimonialsSection from "@/components/sections/TestimonialsSection"


export default function HomePage() {
  return (
    <div className="bg-white dark:bg-gray-900 ">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </div>
  )
}
