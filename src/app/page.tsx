import { ImmersiveHero } from "@/components/sections/ImmersiveHero";
import { BrandStrip } from "@/components/sections/BrandStrip";
import { FeaturedWorks } from "@/components/sections/FeaturedWorks";
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
      <BrandStrip />
      <FeaturedWorks />
      <Challenges />
      <WhatIDo />
      <Proof />
      <HowItWorks />
      <FeaturedInsights />
      <ExecutiveInquiry />
    </>
  );
}