import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaHeart,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaRocket,
  FaCode,
  FaArrowUp,
} from "react-icons/fa";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../utils/constants";

const QUICK_LINKS = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Journey", id: "journey" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

const SERVICES = [
  "Frontend Development",
  "Backend Development",
  "Full-Stack Solutions",
  "Machine Learning",
  "Database Design",
];

const Footer = () => {
  const year = new Date().getFullYear();
  const goTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const socials = [
    { icon: <FaGithub />, href: SOCIAL_LINKS.github, label: "GitHub" },
    { icon: <FaLinkedin />, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
    { icon: <FaTelegram />, href: SOCIAL_LINKS.telegram, label: "Telegram" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-brand/20 bg-surface/40 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container-custom relative z-10 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Enhanced Brand */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="mb-6 flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span 
                className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-brand/40 bg-gradient-to-br from-brand/20 to-emerald-500/20 text-sm font-extrabold text-brand-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                WA
              </motion.span>
              <div>
                <motion.div 
                  className="text-xl font-bold text-ink"
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Wada<span className="text-brand-300">.dev</span>
                </motion.div>
                <div className="text-sm text-muted">
                  Full-Stack Developer & ML Enthusiast
                </div>
              </div>
            </motion.div>
            <p className="max-w-md text-sm leading-relaxed text-muted mb-6">
              Building fast, elegant web applications and exploring machine
              learning. Currently studying Software Engineering at{" "}
              {PERSONAL_INFO.university}.
            </p>

            <div className="space-y-3 text-sm mb-6">
              <motion.a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-3 text-muted transition-colors hover:text-brand-300 group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.span 
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 text-brand-300 group-hover:bg-brand/20 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaEnvelope />
                </motion.span>
                {PERSONAL_INFO.email}
              </motion.a>
              <motion.a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-3 text-muted transition-colors hover:text-brand-300 group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.span 
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 text-brand-300 group-hover:bg-brand/20 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaPhone />
                </motion.span>
                {PERSONAL_INFO.phone}
              </motion.a>
              <motion.div 
                className="flex items-center gap-3 text-muted"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.span 
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 text-brand-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaMapMarkerAlt />
                </motion.span>
                {PERSONAL_INFO.location}
              </motion.div>
            </div>

            <div className="flex gap-4">
              {socials.map((s, index) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.15,
                    borderColor: "rgb(16, 185, 129)",
                    color: "rgb(16, 185, 129)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-line/50 text-muted transition-all duration-300"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h4 
              className="mb-6 font-semibold text-ink flex items-center gap-2"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaCode className="text-brand-300" />
              Quick Links
            </motion.h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((l, index) => (
                <motion.li 
                  key={l.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
                >
                  <motion.button
                    onClick={() => goTo(l.id)}
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-muted transition-colors hover:text-brand-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand/30 group-hover:bg-brand-300 transition-colors duration-300" />
                    {l.name}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Enhanced Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h4 
              className="mb-6 font-semibold text-ink flex items-center gap-2"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaRocket className="text-brand-300" />
              Services
            </motion.h4>
            <ul className="space-y-3">
              {SERVICES.map((s, index) => (
                <motion.li 
                  key={s}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
                  className="text-sm text-muted flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand/30 group-hover:bg-brand-300 transition-colors duration-300" />
                  {s}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Enhanced bottom section */}
        <motion.div 
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line/70 pt-8 text-sm text-muted sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.p 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            © {year} {PERSONAL_INFO.name}. Made with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaHeart className="text-brand-400" />
            </motion.span>
            {" "}in {PERSONAL_INFO.location}.
          </motion.p>
          <motion.p 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Built with React, Tailwind & Framer Motion.
          </motion.p>
          
          {/* Scroll to top button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand-300 hover:bg-brand/20 transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
