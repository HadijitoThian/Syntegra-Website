import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Marquee from "@/components/sections/Marquee";
import ProductsShowcase from "@/components/sections/ProductsShowcase";
import WhoWeAre from "@/components/sections/WhoWeAre";
import WhatWeSolve from "@/components/sections/WhatWeSolve";
import HowWeWork from "@/components/sections/HowWeWork";
import Testimonials from "@/components/sections/Testimonials";
import FuturePipeline from "@/components/sections/FuturePipeline";
import InsightsPreview from "@/components/sections/InsightsPreview";
import ContactCTA from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Marquee />
      <ProductsShowcase />
      <WhoWeAre />
      <WhatWeSolve />
      <HowWeWork />
      <Testimonials />
      <FuturePipeline />
      <InsightsPreview />
      <ContactCTA />
    </>
  );
}
