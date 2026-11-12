import { MotionConfig } from "motion/react";
import Nav from "@/components/Nav";
import Petals from "@/components/Petals";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Hobbies from "@/components/Hobbies";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <Petals />
      <main className="mx-auto w-full max-w-5xl px-4 md:px-8">
        <Hero />
        <Experience />
        <Projects />
        <Hobbies />
        <Contact />
      </main>
    </MotionConfig>
  );
}
