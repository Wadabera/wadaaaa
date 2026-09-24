import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Enhanced ScrollProgress — a premium animated progress bar at the top
 * that fills as the page scrolls with smooth spring animation and gradient effects.
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 0.3]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, opacity }}
      className="fixed inset-x-0 top-0 z-[120] h-1 origin-left"
    >
      {/* Main progress bar */}
      <motion.div 
        className="h-full bg-gradient-to-r from-brand via-emerald-400 to-teal-400"
        style={{ opacity: glowOpacity }}
      />
      
      {/* Glow effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-brand via-emerald-400 to-teal-400 blur-sm"
        style={{ opacity: glowOpacity }}
      />
      
      {/* Shimmer effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
};

export default ScrollProgress;
