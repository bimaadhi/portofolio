import React from 'react';
import { DriftWall } from './components/react-bits/DriftWall';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Certificates } from './components/Certificates';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="relative min-h-screen bg-[#090a0f] text-gray-100 selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Background Generative Ambient Motion Canvas */}
      <DriftWall />

      {/* Primary Fixed Navigation */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
