"use client";

import BackgroundVideo from "./components/BackgroundVideo";
import LeftSidebar from "./components/LeftSidebar";
import About from "./components/About";
import Technologies from "./components/Technologies";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <BackgroundVideo />
      
      <div className="relative z-10 flex min-h-screen">
        {/* Left Sidebar (Icon Column + Profile Card) */}
        <LeftSidebar />
        
        {/* Fixed Left Sidebar Space (Desktop) - Account for icon column + profile card */}
        <div className="hidden md:block w-[19rem] flex-shrink-0" />
        
        {/* Scrollable Right Content */}
        <div className="flex-1 min-w-0 relative z-20">
          <div className="relative z-20">
            <About />
            <Technologies />
            <Skills />
            <Services />
            <Pricing />
            <Projects />
            <Experience />
            <Blog />
            <Contact />
          </div>
        </div>
      </div>
      <ScrollToTop />
    </main>
  );
}
