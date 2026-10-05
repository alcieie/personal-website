import { MotionConfig } from "motion/react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Hobbies from "@/components/Hobbies";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      {/* soft sunset blobs drifting behind everything */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="blob absolute -top-40 -left-32 size-[34rem] rounded-full bg-rose blur-[120px]" />
        <div className="blob absolute top-1/3 -right-40 size-[30rem] rounded-full bg-peach blur-[120px] [animation-delay:-8s]" />
        <div className="blob absolute -bottom-40 left-1/4 size-[28rem] rounded-full bg-plum blur-[130px] [animation-delay:-15s]" />
      </div>

      <Nav />
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
