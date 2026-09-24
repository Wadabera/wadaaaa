import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaCode,
  FaServer,
  FaDatabase,
  FaBrain,
  FaLayerGroup,
  FaCheck,
  FaRocket,
} from "react-icons/fa";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";

const SERVICES = [
  {
    icon: <FaCode />,
    title: "Frontend Development",
    description:
      "Responsive, accessible, and interactive interfaces with React and Tailwind CSS.",
    features: ["Responsive design", "UI/UX implementation", "Performance optimization"],
    color: "from-blue-500 to-cyan-500",
    popular: false,
  },
  {
    icon: <FaServer />,
    title: "Backend Development",
    description:
      "Robust server-side apps and APIs with Node.js, NestJS, and PHP.",
    features: ["RESTful APIs", "Auth & security", "Real-time features"],
    color: "from-green-500 to-emerald-500",
    popular: true,
  },
  {
    icon: <FaDatabase />,
    title: "Database Design",
    description:
      "Efficient schemas and optimized queries for reliable, fast data access.",
    features: ["Schema design", "Query optimization", "Data migration"],
    color: "from-orange-500 to-red-500",
    popular: false,
  },
  {
    icon: <FaBrain />,
    title: "Machine Learning",
    description:
      "Intelligent systems using deep learning and computer vision.",
    features: ["Image classification", "Model training", "Predictive analytics"],
    color: "from-purple-500 to-pink-500",
    popular: false,
  },
  {
    icon: <FaLayerGroup />,
    title: "Full-Stack Solutions",
    description:
      "End-to-end web applications from concept to deployment.",
    features: ["Complete web apps", "System integration", "Deployment"],
    color: "from-teal-500 to-brand",
    popular: true,
  },
  {
    icon: <FaRocket />,
    title: "Cloud Deployment",
    description:
      "Scalable cloud infrastructure and deployment strategies.",
    features: ["AWS services", "CI/CD pipelines", "Container orchestration"],
    color: "from-yellow-500 to-orange-500",
    popular: false,
  },
];

const Services = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="services" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y }}
      >
        <div className="absolute top-40 left-20 w-72 h-72 bg-brand/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </motion.div>

      <div className="container-custom relative z-10">
        <SectionHeading
          eyebrow="What I Offer"
          title="My"
          highlight="Services"
          subtitle="Comprehensive software development services tailored to bring ideas to life."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <TiltCard
                  max={10}
                  lift={10}
                  className={`glass group relative h-full p-8 border border-line/50 hover:border-brand/30 transition-all duration-500 ${
                    s.popular ? "ring-2 ring-brand/30 shadow-lg shadow-brand/20" : ""
                  }`}
                >
                  {s.popular && (
                    <motion.div 
                      className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand to-emerald-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.9, 1, 0.9]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FaRocket className="text-xs" />
                      Popular
                    </motion.div>
                  )}
                  
                  {/* Enhanced icon with gradient background */}
                  <motion.div 
                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-3xl text-white shadow-lg`}
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {s.icon}
                  </motion.div>
                  
                  <motion.h3 
                    className="mb-3 text-xl font-bold text-ink group-hover:text-brand-300 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {s.title}
                  </motion.h3>
                  
                  <p className="mb-6 text-sm leading-relaxed text-muted">
                    {s.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {s.features.map((f, fi) => (
                      <motion.li
                        key={f}
                        className="flex items-center gap-3 text-sm text-muted group-hover:text-ink transition-colors duration-300"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + fi * 0.05, duration: 0.4 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.span 
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand/20 text-brand-300"
                          whileHover={{ scale: 1.2, rotate: 15 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <FaCheck className="text-xs" />
                        </motion.span>
                        {f}
                      </motion.li>
                    ))}
                  </ul>
                  
                  {/* Gradient border effect on hover */}
                  <motion.div 
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}
                  />
                  
                  {/* Animated bottom border */}
                  <motion.div 
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${s.color}`}
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.4 }}
                  />
                </TiltCard>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
