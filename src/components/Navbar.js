import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { FaBars, FaTimes, FaMoon, FaSun, FaPaperPlane, FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";
import { SOCIAL_LINKS } from "../utils/constants";

const NAV_ITEMS = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Journey", id: "journey" },
  { name: "Projects", id: "projects" },
  { name: "Services", id: "services" },
  { name: "Contact", id: "contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const { isDark, toggleTheme } = useTheme();

  const { scrollY } = useScroll();
  const navbarScale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const navbarOpacity = useTransform(scrollY, [0, 50], [1, 0.95]);

  // Enhanced Glass-on-scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const sections = NAV_ITEMS.map((i) => document.getElementById(i.id)).filter(
      Boolean
    );
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <motion.header
      style={{ 
        scale: navbarScale,
        opacity: navbarOpacity
      }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-brand/20 bg-bg/90 py-2.5 backdrop-blur-2xl shadow-lg shadow-brand/10"
          : "border-b border-transparent py-4"
      }`}
    >
      <nav className="container-custom flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Enhanced Logo */}
        <motion.button
          onClick={() => goTo("home")}
          className="group flex items-center gap-2 sm:gap-3"
          aria-label="Go to home"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl border-2 border-brand/40 bg-gradient-to-br from-brand/20 to-emerald-500/20 text-xs sm:text-sm font-extrabold text-brand-300 transition-all duration-300 group-hover:shadow-emerald group-hover:border-brand/60"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            WA
          </motion.span>
          <span className="hidden flex-col leading-none sm:flex">
            <motion.span
              className="text-sm sm:text-base font-bold text-ink group-hover:text-brand-300 transition-colors duration-300"
              whileHover={{ x: 2 }}
            >
              Wada Abera
            </motion.span>
            <span className="text-xs text-muted">Full-Stack Developer</span>
          </span>
        </motion.button>

        {/* Enhanced Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item, index) => (
            <motion.li 
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <motion.button
                onClick={() => goTo(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  active === item.id
                    ? "text-brand-300"
                    : "text-muted hover:text-ink"
                }`}
              >
                {item.name}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-brand/20 to-emerald-500/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            </motion.li>
          ))}
        </ul>

        {/* Enhanced Right controls */}
        <div className="flex items-center gap-3">
          {/* Social links for desktop */}
          <div className="hidden items-center gap-2 md:flex">
            {[
              { icon: <FaGithub />, href: SOCIAL_LINKS.github, label: "GitHub" },
              { icon: <FaLinkedin />, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
              { icon: <FaTelegram />, href: SOCIAL_LINKS.telegram, label: "Telegram" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                whileHover={{ 
                  y: -3, 
                  scale: 1.15,
                  color: "rgb(16, 185, 129)"
                }}
                whileTap={{ scale: 0.9 }}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line/50 text-muted hover:border-brand/50 transition-all duration-300"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          <motion.button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line/50 bg-card/50 text-muted transition-all duration-300 hover:border-brand/50 hover:text-brand-300"
          >
            <motion.div
              animate={{ rotate: isDark ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? <FaSun /> : <FaMoon />}
            </motion.div>
          </motion.button>

          <motion.button
            onClick={() => goTo("contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden btn-primary !px-6 !py-2.5 text-sm sm:inline-flex group relative overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative flex items-center gap-2">
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaPaperPlane className="text-xs" />
              </motion.div>
              Hire Me
            </span>
          </motion.button>

          <motion.button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line/50 bg-card/50 text-ink lg:hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <FaTimes /> : <FaBars />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Enhanced Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="container-custom pb-4 sm:pb-6 pt-3 sm:pt-4">
              <motion.ul
                className="glass flex flex-col gap-2 p-3 sm:p-4 border border-brand/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <motion.button
                      onClick={() => goTo(item.id)}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-left font-medium transition-all duration-300 ${
                        active === item.id
                          ? "bg-gradient-to-r from-brand/20 to-emerald-500/20 text-brand-300 border border-brand/30"
                          : "text-ink hover:bg-card/50 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.name}</span>
                        {active === item.id && (
                          <motion.div
                            layoutId="mobile-active"
                            className="h-2 w-2 rounded-full bg-brand-300"
                          />
                        )}
                      </div>
                    </motion.button>
                  </motion.li>
                ))}
                
                {/* Mobile social links */}
                <motion.div 
                  className="flex items-center justify-center gap-4 pt-4 border-t border-line/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  {[
                    { icon: <FaGithub />, href: SOCIAL_LINKS.github },
                    { icon: <FaLinkedin />, href: SOCIAL_LINKS.linkedin },
                    { icon: <FaTelegram />, href: SOCIAL_LINKS.telegram },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-line/50 text-muted hover:border-brand/50 hover:text-brand-300 transition-all duration-300"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </motion.div>

                <motion.button
                  onClick={() => goTo("contact")}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary mt-4 w-full group relative overflow-hidden"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    <FaPaperPlane className="text-xs" />
                    Hire Me
                  </span>
                </motion.button>
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
