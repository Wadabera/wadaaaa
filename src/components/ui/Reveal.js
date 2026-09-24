import { motion } from "framer-motion";

/**
 * Reveal — scroll-triggered entrance wrapper used across all sections.
 * Animates once when it enters the viewport with a soft spring so motion feels
 * organic rather than linear. Respects prefers-reduced-motion (Framer reads the
 * OS setting; the global CSS rule neutralises transitions as a backstop).
 */
const Reveal = ({
  children,
  delay = 0,
  y = 30,
  once = true,
  amount = 0.2,
  className = "",
  ...rest
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 18,
        mass: 0.7,
        delay,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

/**
 * RevealGroup / RevealItem — container + children that stagger in sequence as
 * the group scrolls into view. Use RevealItem for each child.
 */
export const RevealGroup = ({
  children,
  className = "",
  stagger = 0.08,
  amount = 0.15,
  ...rest
}) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount }}
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: stagger } },
    }}
    {...rest}
  >
    {children}
  </motion.div>
);

export const RevealItem = ({ children, className = "", y = 26, ...rest }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y },
      show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 110, damping: 18 },
      },
    }}
    {...rest}
  >
    {children}
  </motion.div>
);

export default Reveal;
