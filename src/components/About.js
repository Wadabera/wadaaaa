import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaGraduationCap,
  FaCode,
  FaBrain,
  FaRocket,
  FaAward,
  FaLaptopCode,
  FaProjectDiagram,
} from "react-icons/fa";
import wadaImg from "../images/dave.jpg";
import { PERSONAL_INFO } from "../utils/constants";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";
import SectionHeading from "./ui/SectionHeading";
import useCountUp from "../hooks/useCountUp";


const HIGHLIGHTS = [
  {
    icon: <FaGraduationCap />,
    title: "Education",
    description: "B.Sc. Software Engineering at Jimma University (2025-2029)",
    color: "from-brand to-emerald-500",
  },
  {
    icon: <FaCode />,
    title: "Full-Stack Development",
    description: "React, NestJS, Node.js, PostgreSQL & MongoDB",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: <FaBrain />,
    title: "Production Experience",
    description: "Delivered complete B2B e-commerce backend & real estate platforms",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: <FaRocket />,
    title: "Professional Work",
    description: "Paid internships at Andropia PLC & Debo Engineering PLC",
    color: "from-cyan-500 to-brand",
  },
  {
    icon: <FaAward />,
    title: "Achievements",
    description: "95% ML accuracy, internship certificates, and recognition",
    color: "from-brand to-purple-500",
  },
  {
    icon: <FaLaptopCode />,
    title: "Continuous Learning",
    description: "Actively expanding skills in Java, Prisma, and AWS",
    color: "from-purple-500 to-pink-500",
  },
];

const STATS = [
  { end: 15, suffix: "+", label: "Projects Completed", icon: <FaProjectDiagram /> },
  { end: 4, suffix: "", label: "Paid Internships", icon: <FaAward /> },
  { end: 18, suffix: "+", label: "Technologies", icon: <FaCode /> },
  { end: 95, suffix: "%", label: "ML Accuracy", icon: <FaBrain /> },
];

const StatItem = ({ end, suffix, label, icon }) => {
  const [ref, value] = useCountUp(end);
  return (
    <motion.div 
      ref={ref} 
      className="text-center group"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div 
        className="mb-3 flex justify-center"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand/20 to-emerald-500/20 text-brand-300 group-hover:from-brand/30 group-hover:to-emerald-500/30 transition-all duration-300">
          {icon}
        </span>
      </motion.div>
      <div className="text-3xl font-extrabold text-brand-300 sm:text-4xl">
        {value}
        {suffix}
      </div>
      <div className="mt-1 text-sm text-muted group-hover:text-brand-300 transition-colors duration-300">{label}</div>
    </motion.div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y, opacity }}
      >
        <div className="absolute top-20 right-20 w-64 h-64 bg-brand/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </motion.div>

      <div className="container-custom relative z-10">
        <SectionHeading
          eyebrow="Get to know me"
          title="About"
          highlight="Me"
          subtitle="A passionate software engineer crafting digital experiences and exploring the future of technology."
        />

        <div className="mb-16 grid items-center gap-12 lg:grid-cols-12">
          {/* Enhanced Image */}
          <Reveal className="lg:col-span-5" y={0}>
            <motion.div 
              className="relative mx-auto max-w-sm group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-brand/30 to-emerald-400/30 blur-2xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <div className="relative overflow-hidden rounded-3xl border-2 border-brand/30 shadow-2xl shadow-brand/20">
                <img
                  src={wadaImg}
                  alt="Wada Abera"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
                
                {/* Interactive overlay */}
                <motion.div 
                  className="absolute inset-0 bg-brand/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ opacity: 0.1 }}
                />
              </div>
              
              {/* Enhanced badge */}
              <motion.div 
                className="glass absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 px-6 py-4 shadow-soft border border-brand/30"
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.span 
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand/20 to-emerald-500/20 text-brand-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <FaCode />
                </motion.span>
                <div className="leading-tight">
                  <div className="text-sm font-bold text-ink">
                    {PERSONAL_INFO.year}
                  </div>
                  <div className="text-xs text-muted">SE Student</div>
                </div>
              </motion.div>
            </motion.div>
          </Reveal>

          {/* Enhanced Content */}
          <div className="space-y-8 lg:col-span-7">
            <Reveal>
              <motion.h3 
                className="text-2xl font-bold text-ink sm:text-3xl"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Building Production-Grade Applications from Frontend to Database
              </motion.h3>
            </Reveal>
            
            <Reveal delay={0.05}>
              <p className="leading-relaxed text-muted">
                I'm a{" "}
                <motion.span 
                  className="font-semibold text-brand-300 inline-block"
                  whileHover={{ y: -2, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Full-Stack Developer
                </motion.span>{" "}
                with hands-on experience building complete, production-style applications end to end — 
                from React front ends to NestJS/Node.js APIs backed by PostgreSQL and MongoDB.
              </p>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="leading-relaxed text-muted">
                I delivered the entire{" "}
                <motion.span 
                  className="font-semibold text-brand-300 inline-block"
                  whileHover={{ y: -2, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  backend for a B2B e-commerce platform
                </motion.span>{" "}
                during a paid internship at Andropia PLC, including secure OTP-based authentication, 
                and independently built full-stack{" "}
                <motion.span 
                  className="font-semibold text-brand-300 inline-block"
                  whileHover={{ y: -2, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  real estate/rental and e-commerce platforms
                </motion.span>{" "}
                integrating React with Express, PostgreSQL, and MongoDB.
              </p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="leading-relaxed text-muted">
                Comfortable owning a feature from UI to database schema, with a strong focus on{" "}
                <motion.span 
                  className="font-semibold text-brand-300 inline-block"
                  whileHover={{ y: -2, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  secure API design, clean architecture, responsive interfaces, and scalable systems
                </motion.span>
                . Currently pursuing B.Sc. Software Engineering at {PERSONAL_INFO.university} and 
                actively deepening skills in Java, Prisma, and AWS.
              </p>
            </Reveal>

            {/* Enhanced Highlights */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {HIGHLIGHTS.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.08}>
                  <TiltCard max={12} lift={8} className="glass group h-full p-6 border border-line/50 hover:border-brand/30 transition-all duration-300">
                    <motion.div 
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand/20 to-emerald-500/20 text-lg text-brand-300 transition-all duration-300 group-hover:scale-110 group-hover:from-brand/30 group-hover:to-emerald-500/30"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {item.icon}
                    </motion.div>
                    <h4 className="mb-2 font-semibold text-ink group-hover:text-brand-300 transition-colors duration-300">{item.title}</h4>
                    <p className="text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                    <motion.div 
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-brand to-emerald-500"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Stats band */}
        <Reveal>
          <motion.div 
            className="glass grid grid-cols-2 gap-8 p-10 sm:grid-cols-4 border border-brand/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <StatItem {...s} />
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
