import { EditorialHero } from "@/components/sections/EditorialHero";
import { Audience } from "@/components/sections/Audience";
import { Services } from "@/components/sections/Services";
import { EditorialProof } from "@/components/sections/EditorialProof";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Insights } from "@/components/sections/Insights";
import { Contact } from "@/components/sections/Contact";
import { getEditorial } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const editorial = await getEditorial();

  return (
    <>
      <EditorialHero data={editorial.hero} />
      <Audience data={editorial.audience as any} />
      <Services data={editorial.services as any} />
      <EditorialProof data={editorial.proof as any} />
      <About data={editorial.about as any} />
      <Process data={editorial.process as any} />
      <Insights data={editorial.insights as any} />
      <Contact data={editorial.contact as any} />
    </>
  );
}