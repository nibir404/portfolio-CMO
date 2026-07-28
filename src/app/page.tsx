import { ImmersiveHero } from "@/components/sections/ImmersiveHero";
import { Challenges } from "@/components/sections/Challenges";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { Proof } from "@/components/sections/Proof";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FeaturedInsights } from "@/components/sections/FeaturedInsights";
import { ExecutiveInquiry } from "@/components/sections/ExecutiveInquiry";

export default function HomePage() {
  return (
    <>
      <ImmersiveHero />
      <Challenges />
      <WhatIDo />
      <Proof />
      <HowItWorks />
      <FeaturedInsights />
      <ExecutiveInquiry />
    </>
  );
}