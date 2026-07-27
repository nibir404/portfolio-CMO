import { ImmersiveHero } from "@/components/sections/ImmersiveHero";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { Proof } from "@/components/sections/Proof";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FeaturedInsights } from "@/components/sections/FeaturedInsights";
import { ExecutiveInquiry } from "@/components/sections/ExecutiveInquiry";

export default function HomePage() {
  return (
    <>
      <ImmersiveHero />
      <WhatIDo />
      <Proof />
      <HowItWorks />
      <FeaturedInsights />
      <ExecutiveInquiry />
    </>
  );
}