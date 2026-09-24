/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useTransform as useScrollTransform,
} from "framer-motion";
import {
  FaDownload,
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaArrowRight,
  FaEnvelope,
  FaStar,
  FaCode,
  FaRocket,
  FaReact,
  FaBrain,
} from "react-icons/fa";
import wadapct from "../images/mm.png";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../utils/constants";
import useCountUp from "../hooks/useCountUp";
import MagneticButton from "./ui/MagneticButton";

const TITLES = [
  "Software Engineering Student",
  "Full-Stack Web Developer",
  "Machine Learning Enthusiast",
  "Problem Solver & Innovator",
  "Digital Experience Creator",
];

const HeroStat = ({ end, suffix, label }) => {
  const [ref, value] = useCountUp(end);
  return (
    <div ref={ref} className="text-center sm:text-left">
      <div className="text-3xl font-extrabold text-brand-300">
        {value}
        {suffix}
      </div>
      <div className="text-sm text-muted">{label}</div>
    </div>
  );
};

const Hero = () => {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Typewriter with enhanced animation
  useEffect(() => {
    const current = TITLES[idx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (text.length < current.length) {
            setText(current.slice(0, text.length + 1));
          } else {
            setTimeout(() => setDeleting(true), 2000);
          }
        } else {
          if (text.length > 0) setText(text.slice(0, -1));
          else {
            setDeleting(false);
            setIdx((p) => (p + 1) % TITLES.length);
          }
        }
      },
      deleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [text, idx, deleting]);

  // Enhanced mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useScrollTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useScrollTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const y = useScrollTransform(scrollYProgress, [0, 1], [0, 100]);

  // Cursor parallax for the portrait with enhanced sensitivity
  const portraitRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [15, -15]), {
    stiffness: 200,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-15, 15]), {
    stiffness: 200,
    damping: 20,
  });

  const onPortraitMove = (e) => {
    const r = portraitRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPortraitLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = `${process.env.PUBLIC_URL}/cv/Wada_Abera_Chala_CV_FullStack.pdf`;
    link.download = "Wada_Abera_Chala_CV_FullStack.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const socials = [
    { icon: FaGithub, href: SOCIAL_LINKS.github, label: "GitHub" },
    { icon: FaLinkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
    { icon: FaTelegram, href: SOCIAL_LINKS.telegram, label: "Telegram" },
  ];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
      style={{ opacity, scale, y }}
    >
      {/* Enhanced Cinematic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Interactive Grid Background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `perspective(1000px) rotateX(60deg) translateY(${mousePosition.y * 20}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        
        {/* Enhanced Floating Particles with Mouse Interaction */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="particle absolute rounded-full bg-gradient-to-r from-brand to-emerald-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Cinematic Gradient Orbs with Enhanced Animation */}
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-brand/30 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 bg-emerald-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-teal-400/25 rounded-full blur-3xl"
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Mouse-following Glow Effect */}
        <motion.div
          className="absolute w-96 h-96 bg-brand/20 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x * 100,
            y: mousePosition.y * 100,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25
          }}
        />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left - Enhanced Content */}
          <motion.div
            className="space-y-8 lg:col-span-7"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Enhanced Availability Badge */}
            <motion.div 
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-3d border border-brand/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(16, 185, 129, 0.6)' }}
            >
              <motion.span 
                className="h-3 w-3 rounded-full bg-brand"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-semibold text-brand-300">
                Available for internships & opportunities
              </span>
            </motion.div>

            {/* Enhanced Hero Heading */}
            <motion.h1 
              className="text-5xl font-extrabold leading-[1.05] text-ink sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Hi, I'm{" "}
              <motion.span 
                className="gradient-text animate-text-glow relative inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {PERSONAL_INFO.name.split(" ")[0]}
                <motion.span 
                  className="absolute -inset-1 bg-gradient-to-r from-brand/30 to-emerald-400/30 blur-xl -z-10"
                  animate={{ 
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.span>{" "}
              {PERSONAL_INFO.name.split(" ")[1]}
            </motion.h1>

            {/* Enhanced Typewriter Effect */}
            <motion.div 
              className="flex h-10 items-center text-xl font-semibold text-muted sm:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="type-caret text-brand-300">{text}</span>
              <motion.span 
                className="ml-1 w-0.5 h-6 bg-brand"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </motion.div>

            {/* Enhanced Description */}
            <motion.p 
              className="max-w-xl text-lg leading-relaxed text-muted text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              I craft{" "}
              <motion.span 
                className="font-semibold text-brand-300 inline-block"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                fast, elegant web applications
              </motion.span>{" "}
              and explore{" "}
              <motion.span 
                className="font-semibold text-brand-300 inline-block"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                machine learning
              </motion.span>
              . Currently a {PERSONAL_INFO.year} Software Engineering student at{" "}
              {PERSONAL_INFO.university}.
            </motion.p>

            {/* Enhanced CTAs */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <MagneticButton
                onClick={() => scrollTo("projects")}
                className="btn-primary group relative overflow-hidden"
              >
                <motion.span 
                  className="relative z-10 flex items-center gap-2"
                  whileHover={{ x: 2 }}
                >
                  View Projects
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaArrowRight className="text-sm" />
                  </motion.div>
                </motion.span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-brand-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                  animate={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </MagneticButton>
              
              <MagneticButton 
                onClick={downloadCV} 
                className="btn-ghost glass-3d hover:shadow-emerald group"
              >
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ x: 2 }}
                >
                  <FaDownload className="text-sm" />
                  Download CV
                </motion.div>
              </MagneticButton>
              
              <MagneticButton
                onClick={() => scrollTo("contact")}
                className="btn-ghost glass-3d hover:shadow-emerald group"
              >
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ x: 2 }}
                >
                  <FaEnvelope className="text-sm" />
                  Contact Me
                </motion.div>
              </MagneticButton>
            </motion.div>

            {/* Enhanced Stats with Animated Counters */}
            <motion.div 
              className="flex flex-wrap gap-10 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.div 
                className="text-center sm:text-left"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <HeroStat end={15} suffix="+" label="Projects" />
              </motion.div>
              <motion.div 
                className="text-center sm:text-left"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <HeroStat end={3} suffix="+" label="Years Coding" />
              </motion.div>
              <motion.div 
                className="text-center sm:text-left"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <HeroStat end={12} suffix="+" label="Technologies" />
              </motion.div>
            </motion.div>

            {/* Enhanced Socials with Premium Effects */}
            <motion.div 
              className="flex gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {socials.map((s, index) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                  whileHover={{
                    y: -10,
                    rotate: index % 2 === 0 ? -8 : 8,
                    scale: 1.15,
                    boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
                    transition: { type: "spring", stiffness: 400, damping: 15 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl glass-3d text-muted hover:text-brand-300 shadow-soft hover:shadow-emerald relative overflow-hidden group"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-brand/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ 
                      background: [
                        "linear-gradient(to bottom right, rgba(16, 185, 129, 0.2), rgba(52, 211, 153, 0.2))",
                        "linear-gradient(to top left, rgba(16, 185, 129, 0.4), rgba(52, 211, 153, 0.4))",
                        "linear-gradient(to bottom right, rgba(16, 185, 129, 0.2), rgba(52, 211, 153, 0.2))"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <s.icon size={20} className="relative z-10" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Enhanced Portrait */}
          <motion.div
            className="flex justify-center lg:col-span-5 lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <motion.div
              ref={portraitRef}
              onMouseMove={onPortraitMove}
              onMouseLeave={onPortraitLeave}
              style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
              className="relative h-72 w-72 sm:h-80 sm:w-80 lg:h-[28rem] lg:w-[28rem] perspective-container"
            >
              {/* Enhanced Pulsing Outer Glow Ring */}
              <motion.div 
                className="absolute -inset-6 rounded-full bg-gradient-to-r from-brand via-emerald-400 to-teal-400 blur-3xl"
                animate={{ 
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Enhanced rotating ring with neon effect */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-500 via-brand-400 to-emerald-300 p-[4px]"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="h-full w-full rounded-full bg-bg" />
              </motion.div>
              
              {/* Secondary rotating ring */}
              <motion.div 
                className="absolute inset-4 rounded-full bg-gradient-to-bl from-teal-400 via-emerald-500 to-brand-500 p-[2px]"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <div className="h-full w-full rounded-full bg-bg" />
              </motion.div>
              
              {/* Enhanced morphing glow */}
              <motion.div 
                className="absolute inset-3 rounded-full bg-brand/40 blur-3xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              
              {/* Enhanced 3D image container */}
              <motion.div 
                className="absolute inset-6 overflow-hidden rounded-full border-2 border-brand/50 shadow-emerald-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={wadapct}
                  alt="Wada Abera, Full-Stack Developer"
                  width={448}
                  height={448}
                  className="h-full w-full object-cover"
                />
                {/* Enhanced shine effect overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent"
                  animate={{ 
                    x: ['-100%', '100%']
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand/20 via-transparent to-transparent" />
              </motion.div>
              
              {/* Enhanced floating tech chips with 3D effect */}
              <motion.div
                className="absolute -right-4 top-12 tech-chip !px-4 !py-2.5 shadow-emerald glass-3d card-shine flex items-center gap-2"
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                whileHover={{ scale: 1.15, rotate: 10 }}
              >
                <FaReact className="text-brand-300" />
                React
              </motion.div>
              
              <motion.div
                className="absolute -left-4 bottom-20 tech-chip !px-4 !py-2.5 shadow-emerald glass-3d card-shine flex items-center gap-2"
                animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                whileHover={{ scale: 1.15, rotate: -10 }}
              >
                <FaCode className="text-emerald-300" />
                NestJS
              </motion.div>
              
              <motion.div
                className="absolute bottom-4 right-16 tech-chip !px-4 !py-2.5 shadow-emerald glass-3d card-shine flex items-center gap-2"
                animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 4.5, repeat: Infinity }}
                whileHover={{ scale: 1.15, rotate: 8 }}
              >
                <FaRocket className="text-teal-300" />
                Python
              </motion.div>
              
              {/* Additional enhanced floating tech badges */}
              <motion.div
                className="absolute top-1/4 -left-12 tech-chip !px-3 !py-2 shadow-emerald glass-3d flex items-center gap-2"
                animate={{ 
                  y: [0, -18, 0],
                  rotate: [0, 12, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 6, repeat: Infinity }}
                whileHover={{ scale: 1.2 }}
              >
                <FaBrain className="text-brand-300" />
                AI/ML
              </motion.div>
              
              <motion.div
                className="absolute top-1/3 -right-10 tech-chip !px-3 !py-2 shadow-emerald glass-3d flex items-center gap-2"
                animate={{ 
                  y: [0, 14, 0],
                  rotate: [0, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 5.5, repeat: Infinity }}
                whileHover={{ scale: 1.2 }}
              >
                <FaStar className="text-emerald-300" />
                TypeScript
              </motion.div>
              
              {/* New floating badge */}
              <motion.div
                className="absolute bottom-16 -left-8 tech-chip !px-3 !py-2 shadow-emerald glass-3d flex items-center gap-2"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, -8, 0],
                  x: [0, 5, 0]
                }}
                transition={{ duration: 7, repeat: Infinity }}
                whileHover={{ scale: 1.2 }}
              >
                <FaRocket className="text-teal-300" />
                Full-Stack
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.button
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-muted transition-colors hover:text-brand-300 sm:flex group"
        aria-label="Scroll to about"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        whileHover={{ y: -5 }}
      >
        <motion.span 
          className="text-xs font-medium tracking-[0.3em] uppercase"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.span>
        <motion.span 
          className="flex h-12 w-7 justify-center rounded-full border-2 border-line/50 group-hover:border-brand/50 transition-colors pt-2"
          whileHover={{ scale: 1.1 }}
        >
          <motion.span
            className="h-2 w-1.5 rounded-full bg-gradient-to-b from-brand to-emerald-400"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.span>
      </motion.button>
    </section>
  );
};

export default Hero;
