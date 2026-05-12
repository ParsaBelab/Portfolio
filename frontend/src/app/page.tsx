import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Stack } from "@/components/sections/Stack";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Github } from "@/components/sections/Github";
import { Now } from "@/components/sections/Now";
import { Contact } from "@/components/sections/Contact";
import { api } from "@/lib/api";

export const revalidate = 60;

export default async function Home() {
  // Server-side fetch for server components only.
  // Client components (Hero, Projects) fetch via hooks in `src/hooks/useApi.ts`.
  const [site, experience, skills] = await Promise.all([
    api.site(),
    api.experience(),
    api.skills(),
  ]);

  return (
    <>
      <Hero />
      <About site={site} />
      <Stack categories={skills} />
      <Skills />
      <Experience entries={experience} />
      <Projects />
      <Github />
      <Now items={site.current_focus} />
      <Contact site={site} />
    </>
  );
}
