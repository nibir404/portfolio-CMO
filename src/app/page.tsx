import { EditorialHero } from "@/components/sections/EditorialHero";
import { Audience } from "@/components/sections/Audience";
import { Services } from "@/components/sections/Services";
import { EditorialProof } from "@/components/sections/EditorialProof";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Insights } from "@/components/sections/Insights";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <EditorialHero />
      <Audience />
      <Services />
      <EditorialProof />
      <About />
      <Process />
      <Insights />
      <Contact />
    </>
  );
}