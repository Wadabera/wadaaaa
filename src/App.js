import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import AccessibilityProvider from "./components/AccessibilityProvider";
import useToast from "./hooks/useToast";
import { ToastContainer } from "./components/Toast";

import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import AnimatedBackground from "./components/AnimatedBackground";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Certificates from "./components/Certificates";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const { toasts, addToast, removeToast } = useToast();

  return (
    <ThemeProvider>
      <AccessibilityProvider>
        {/* Skip link for keyboard / screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>

        <LoadingScreen />
        <CustomCursor />
        <ScrollProgress />
        <AnimatedBackground />

        <div className="relative z-10 min-h-screen">
          <Navbar />
          <main id="main-content" role="main">
            <Hero />
            <About />
            <Skills />
            <Timeline />
            <Projects />
            <Services />
            <Certificates />
            <Testimonials />
            <Contact addToast={addToast} />
          </main>
          <Footer />
        </div>

        <BackToTop />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </AccessibilityProvider>
    </ThemeProvider>
  );
}

export default App;
