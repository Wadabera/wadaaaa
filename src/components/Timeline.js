/* eslint-disable react/jsx-no-duplicate-props */
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaGraduationCap,
  FaBriefcase,
  FaLaptopCode,
  FaBrain,
  FaCertificate,
  FaRocket,
  FaAward,
} from "react-icons/fa";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

const ITEMS = [
  {
    type: "Education",
    icon: <FaGraduationCap />,
    period: "2021 — Present",
    title: "B.Sc. Software Engineering",
    org: "Jimma University",
    description:
      "Studying algorithms, data structures, databases, and modern software engineering. Consistently among top performers in project-based coursework.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    type: "Experience",
    icon: <FaBriefcase />,
    period: "2024",
    title: "Software Engineering Intern",
    org: "Andropia PLC & Debo Engineering",
    description:
      "Built and maintained real features in a team setting, applying Git workflows, code review, and agile delivery to production-style projects.",
    color: "from-green-500 to-emerald-500",
  },
  {
    type: "Project",
    icon: <FaLaptopCode />,
    period: "2024",
    title: "Full-Stack Applications",
    org: "Personal & Coursework",
    description:
      "Shipped React + NestJS apps and PHP/MySQL systems — e-commerce carts, management systems, and REST APIs with JWT auth.",
    color: "from-purple-500 to-pink-500",
  },
  {
    type: "Achievement",
    icon: <FaBrain />,
    period: "2024",
    title: "Deep Learning Project",
    org: "Computer Vision",
    description:
      "Trained a CNN-based fruit & vegetable classifier reaching ~95% accuracy, deployed with a Streamlit web interface.",
    color: "from-orange-500 to-red-500",
  },
  {
    type: "Certification",
    icon: <FaCertificate />,
    period: "Ongoing",
    title: "Continuous Learning",
    org: "Certificates & Courses",
    description:
      "Completed certifications in web development and English proficiency, with ongoing self-study in cloud and ML.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    type: "Innovation",
    icon: <FaRocket />,
    period: "2024",
    title: "Production-Grade Systems",
    org: "Professional Development",
    description:
      "Delivered complete B2B e-commerce backend with OTP authentication and scalable architecture for real-world deployment.",
    color: "from-teal-500 to-brand",
  },
  {
    type: "Recognition",
    icon: <FaAward />,
    period: "2024",
    title: "Internship Excellence",
    org: "Prodigy InfoTech",
    description:
      "Completed one-month frontend development internship with outstanding remarks and performance recognition.",
    color: "from-pink-500 to-rose-500",
  },
];

const Timeline = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="journey" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y }}
      >
        <div className="absolute top-20 right-20 w-64 h-64 bg-brand/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </motion.div>

      <div className="container-custom relative z-10">
        <SectionHeading
          eyebrow="Experience & Education"
          title="My"
          highlight="Journey"
          subtitle="The path so far — education, hands-on experience, and milestones that shaped how I build."
        />

        <div className="relative mx-auto max-w-5xl">
          {/* Enhanced center/left line with animation */}
          <motion.div 
            className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-brand/60 via-line to-transparent md:left-1/2 md:-translate-x-1/2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <div className="space-y-12">
            {ITEMS.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal
                  key={item.title}
                  delay={i * 0.08}
                  className={`relative flex items-start gap-6 pl-12 md:pl-0 ${
                    left ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Enhanced node with animation */}
                  <motion.span 
                    className="absolute left-4 top-1.5 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-brand/50 bg-bg text-sm text-brand-300 shadow-emerald md:left-1/2"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{ 
                      background: `linear-gradient(to bottom right, ${item.color})`,
                      borderColor: item.color.split(' ')[1]
                    }}
                  >
                    <motion.span 
                      className="absolute inset-0 rounded-full opacity-30"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ background: item.color }}
                    />
                    <span className="relative text-white">{item.icon}</span>
                  </motion.span>

                  {/* Enhanced card side */}
                  <div className="w-full md:w-1/2">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      whileHover={{
                        y: -8,
                        scale: 1.02,
                        boxShadow: "0 25px 50px rgba(16, 185, 129, 0.15)"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`glass p-7 border border-line/50 hover:border-brand/30 relative overflow-hidden group ${
                        left ? "md:mr-10" : "md:ml-10"
                      }`}
                    >
                      {/* Gradient overlay on hover */}
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      />
                      
                      <div className="relative z-10">
                        <div className="mb-3 flex items-center gap-3">
                          <motion.span 
                            className={`tech-chip !px-4 !py-1.5 bg-gradient-to-r ${item.color} text-white border-0`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {item.type}
                          </motion.span>
                          <motion.span 
                            className="text-xs font-semibold text-muted bg-line/50 px-3 py-1 rounded-full"
                            whileHover={{ scale: 1.05 }}
                          >
                            {item.period}
                          </motion.span>
                        </div>
                        <motion.h3 
                          className="text-xl font-bold text-ink mb-2 group-hover:text-brand-300 transition-colors duration-300"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {item.title}
                        </motion.h3>
                        <motion.p 
                          className="mb-3 text-sm font-semibold text-brand-300"
                          whileHover={{ x: 3 }}
                        >
                          {item.org}
                        </motion.p>
                        <p className="text-sm leading-relaxed text-muted">
                          {item.description}
                        </p>
                      </div>
                      
                      {/* Animated bottom border */}
                      <motion.div 
                        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${item.color}`}
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.4 }}
                      />
                    </motion.div>
                  </div>

                  {/* Enhanced spacer for the other half on desktop */}
                  <div className="hidden md:block md:w-1/2" />
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
