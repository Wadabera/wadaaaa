import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaBuilding,
  FaAward,
  FaTrophy,
  FaCrown,
  FaFire,
  FaGem,
} from "react-icons/fa";
import batiImg from "../images/baatii2.jpg";
import falmiImg from "../images/falmi.jpg";
import boazImg from "../images/boaz.jpg";
import dawwitImg from "../images/DAWWIT.jpg";
import jarmiaImg from "../images/JARMIA.jpg";
import Reveal from "./ui/Reveal";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Enginer Dawwit TESFAYE",
    role: "Founder of Andropia PLC Technology",
    image: dawwitImg,
    rating: 5,
    text: " Wada demonstrated outstanding technical expertise during his internship at Andropia PLC. His backend development skills, problem-solving abilities, and commitment to excellence made him a valuable addition to our team.",
    badge: "Founder",
    badgeIcon: <FaBuilding />,
    badgeColor: "from-teal-500 to-emerald-500",
    featured: true,
  },
  {
    id: 2,
    name: "Mr Jarmia BaySA",
    role: "CEO and Founder of Debo Engineering PLC",
    image: jarmiaImg,
    rating: 5,
    text: "He commented me as committed and good problem solver, fixer. Wada's dedication and innovative approach to backend development were impressive during his internship. His ability to tackle complex challenges and deliver robust solutions speaks volumes about his potential as a software engineer.",
    badge: "CEO",
    badgeIcon: <FaAward />,
    badgeColor: "from-teal-500 to-emerald-500",
    featured: true,
  },
  {
    id: 3,
    name: "Baatii Shilashi",
    role: "Founder & CEO, Yai Software",
    image: batiImg,
    rating: 5,
    text: "Wada is an exceptional developer with outstanding problem-solving abilities. He consistently delivers high-quality projects and shows strong leadership in team collaborations.",
    badge: "CEO",
    badgeIcon: <FaTrophy />,
    badgeColor: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    name: "Falmi Tasfaye",
    role: "Software Engineering Student & Teammate",
    image: falmiImg,
    rating: 5,
    text: "Working with Wada on our web project was fantastic. His expertise in React and NestJS, plus his grasp of complex requirements, made him an invaluable team member. Highly recommended!",
    badge: "Team Lead",
    badgeIcon: <FaStar />,
    badgeColor: "from-teal-500 to-emerald-500",
  },
  {
    id: 5,
    name: "Boaz Tullu",
    role: "AI Engineer & Lecturer",
    image: boazImg,
    rating: 5,
    text: "Wada writes clean, maintainable code with a deep understanding of both frontend and backend. His machine learning work shows real versatility and a passion for emerging tech.",
    badge: "Expert",
    badgeIcon: <FaAward />,
    badgeColor: "from-teal-500 to-emerald-500",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const sectionRef = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % TESTIMONIALS.length),
    []
  );
  const prev = () =>
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [auto, next]);

  const t = TESTIMONIALS[index];

  return (
    <section id="testimonials" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Stunning Animated Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y }}
      >
        {/* Gradient Orbs */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-teal-600/20 via-emerald-600/10 to-transparent"
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.35, 0.2]
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      <div className="container-custom relative z-10">
        {/* Enhanced Section Heading */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-400/30"
            animate={{ 
              scale: [1, 1.05, 1],
              borderColor: ['rgba(20, 184, 166, 0.3)', 'rgba(16, 185, 129, 0.5)', 'rgba(20, 184, 166, 0.3)']
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.span 
              className="w-2 h-2 bg-teal-400 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-teal-300 text-sm font-semibold tracking-wide">
              TESTIMONIALS
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-extrabold text-ink mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            What People{" "}
            <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent animate-text-glow">
              Say
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Professional endorsements from industry leaders, CEOs, and mentors who've witnessed my work firsthand
          </motion.p>
        </motion.div>

        {/* Stunning Testimonial Display */}
        <Reveal className="mx-auto max-w-4xl">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Glowing Background Effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-600 rounded-3xl blur-2xl"
              animate={{ 
                opacity: [0.25, 0.4, 0.25],
                scale: [1, 1.02, 1]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            {/* Main Card */}
            <div
              className="relative bg-gradient-to-br from-slate-900/95 via-teal-900/90 to-emerald-900/95 rounded-3xl p-8 md:p-12 border border-white/10 backdrop-blur-xl shadow-2xl"
              onMouseEnter={() => setAuto(false)}
              onMouseLeave={() => setAuto(true)}
            >
              {/* Decorative Icons */}
              <div className="absolute top-6 right-6 flex gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <FaCrown className="text-2xl text-yellow-400/50" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaGem className="text-2xl text-pink-400/50" />
                </motion.div>
              </div>

              {/* Featured Badge */}
              {t.featured && (
                <motion.div 
                  className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaFire className="text-yellow-400" />
                  </motion.div>
                  <span className="text-yellow-300 text-xs font-bold">FEATURED</span>
                </motion.div>
              )}

              {/* Quote Icon */}
              <motion.div
                className="mb-6"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <FaQuoteLeft className="text-5xl text-teal-400/40" />
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Testimonial Text */}
                  <p className="text-xl md:text-2xl leading-relaxed text-white/90 mb-8 font-light">
                    "{t.text}"
                  </p>

                  {/* Person Info */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full blur-md opacity-50"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 0.7, 0.5]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <img
                        src={t.image}
                        alt={t.name}
                        loading="lazy"
                        className="relative h-20 w-20 rounded-full border-3 border-white/20 object-cover shadow-xl"
                      />
                      <motion.div
                        className="absolute -bottom-2 -right-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full p-2"
                        animate={{ 
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FaCheckCircle className="text-white text-sm" />
                      </motion.div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">{t.name}</h3>
                        {t.badge && (
                          <motion.div 
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${t.badgeColor} text-white text-xs font-bold`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {t.badgeIcon}
                            {t.badge}
                          </motion.div>
                        )}
                      </div>
                      <div className="text-teal-200/80 mb-3">{t.role}</div>
                      <div className="flex gap-1">
                        {[...Array(t.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                          >
                            <FaStar className="text-yellow-400 text-lg" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Enhanced Controls */}
              <div className="mt-10 flex items-center justify-between">
                <div className="flex gap-3">
                  {TESTIMONIALS.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`h-3 rounded-full transition-all ${
                        i === index 
                          ? "w-8 bg-gradient-to-r from-teal-500 to-emerald-500 shadow-lg shadow-teal-500/50" 
                          : "w-3 bg-white/20 hover:bg-white/40"
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <motion.button
                    onClick={prev}
                    aria-label="Previous"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/60 hover:border-teal-400/50 hover:text-teal-300 hover:bg-teal-500/20 transition-all"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaChevronLeft />
                  </motion.button>
                  <motion.button
                    onClick={next}
                    aria-label="Next"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/60 hover:border-emerald-400/50 hover:text-emerald-300 hover:bg-emerald-500/20 transition-all"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaChevronRight />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>

        {/* Stats Section */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { value: "5+", label: "Testimonials", icon: <FaStar /> },
            { value: "3", label: "CEOs", icon: <FaBuilding /> },
            { value: "2", label: "Founders", icon: <FaAward /> },
            { value: "5", label: "Star Rating", icon: <FaTrophy /> }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass p-6 rounded-2xl text-center border border-white/10"
              whileHover={{ 
                scale: 1.05,
                borderColor: 'rgba(20, 184, 166, 0.3)'
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="text-3xl mb-2 text-teal-400"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {stat.icon}
              </motion.div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-teal-200/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;