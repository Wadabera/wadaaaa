import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaEnvelope,
} from "react-icons/fa";

const NAV_ITEMS = [
  { id: "home", icon: FaHome, label: "Home" },
  { id: "about", icon: FaUser, label: "About" },
  { id: "projects", icon: FaBriefcase, label: "Projects" },
  { id: "contact", icon: FaEnvelope, label: "Contact" },
];

const MobileBottomNav = () => {
  const [active, setActive] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide/show nav based on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Update active section based on scroll position
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden safe-area-bottom"
          style={{
            paddingBottom: 'max(16px, env(safe-area-inset-bottom))'
          }}
        >
          {/* Blur backdrop with glass effect */}
          <div className="absolute inset-0 bg-bg/90 backdrop-blur-2xl border-t border-line/30 shadow-2xl shadow-black/20" />
          
          {/* Subtle gradient line at top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
          
          {/* Navigation content */}
          <div className="relative px-2 py-2 sm:px-4 sm:py-3">
            <div className="flex items-center justify-around">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.id;
                const Icon = item.icon;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="relative flex flex-col items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl transition-all duration-300 min-w-[60px] sm:min-w-[70px]"
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* Active indicator glow */}
                    {isActive && (
                      <motion.div
                        layoutId="activeGlow"
                        className="absolute inset-0 bg-gradient-to-t from-brand/20 to-emerald-500/10 rounded-2xl"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    
                    {/* Icon */}
                    <motion.div
                      className="relative z-10 mb-1"
                      animate={{
                        scale: isActive ? 1.15 : 1,
                        y: isActive ? -2 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <Icon
                        className={`text-xl sm:text-2xl transition-colors duration-300 ${
                          isActive
                            ? "text-brand-300"
                            : "text-muted"
                        }`}
                      />
                    </motion.div>
                    
                    {/* Label */}
                    <motion.span
                      className={`relative z-10 text-[10px] sm:text-xs font-medium transition-colors duration-300 ${
                        isActive
                          ? "text-brand-300"
                          : "text-muted"
                      }`}
                      animate={{
                        opacity: isActive ? 1 : 0.7,
                      }}
                    >
                      {item.label}
                    </motion.span>
                    
                    {/* Active dot indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeDot"
                        className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-300 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default MobileBottomNav;