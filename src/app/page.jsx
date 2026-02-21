import Hero from "@/components/home/Hero";
import WhyYouNeedThis from "@/components/home/WhyYouNeedThis";
import WhatMakesMeDifferent from "@/components/home/WhatMakesMeDifferent";
import Pricing from "@/components/home/Pricing";
import HowItWorks from "@/components/home/HowItWorks";
import Projects from "@/components/home/Projects";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <WhyYouNeedThis />
      <WhatMakesMeDifferent />
      <Pricing />
      <HowItWorks />
      <Projects />
      <FAQ />
      <FinalCTA />
    </div>
  );
}