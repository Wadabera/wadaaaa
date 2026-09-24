import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

/**
 * BackToTop — appears after scrolling past 400px and shows a circular scroll
 * progress ring. Replaces the scroll-top button previously hardcoded in Footer.
 */
const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? scrollTop / height : 0);
      setVisible(scrollTop > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const R = 26;
  const C = 2 * Math.PI * R;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="group fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full border border-line bg-card/80 text-brand-300 shadow-soft backdrop-blur-md"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 60 60">
            <circle
              cx="30"
              cy="30"
              r={R}
              fill="none"
              stroke="rgb(var(--c-border))"
              strokeWidth="3"
            />
            <circle
              cx="30"
              cy="30"
              r={R}
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - progress)}
            />
          </svg>
          <FaArrowUp className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
