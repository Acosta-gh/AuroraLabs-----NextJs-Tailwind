import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";

const WhyYouNeedThis = dynamic(() => import("@/components/home/WhyYouNeedThis"));
const WhatMakesMeDifferent = dynamic(() => import("@/components/home/WhatMakesMeDifferent"));
const Pricing = dynamic(() => import("@/components/home/Pricing"));
const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"));
const Projects = dynamic(() => import("@/components/home/Projects"));
const FAQ = dynamic(() => import("@/components/home/FAQ"));
const FinalCTA = dynamic(() => import("@/components/home/FinalCTA"));

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
