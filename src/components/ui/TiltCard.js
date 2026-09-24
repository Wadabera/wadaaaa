import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * TiltCard — a 3D card that tilts toward the cursor with a soft spring and
 * shows a moving light "glare". Also lifts slightly on hover. Pointer-fine /
 * motion-allowed only; otherwise renders a static div with the same classes.
 *
 * Props: max (deg), lift (px), className, children, ...rest
 */
const TiltCard = ({
  max = 8,
  lift = 6,
  className = "",
  glare = true,
  children,
  ...rest
}) => {
  const ref = useRef(null);
  const px = useMotionValue(0.5); // 0..1 pointer position
  const py = useMotionValue(0.5);

  const enabled =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const sx = useSpring(px, { stiffness: 200, damping: 20 });
  const sy = useSpring(py, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const glareBg = useTransform(
    [sx, sy],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx * 100}% ${gy * 100}%, rgba(52,211,153,0.18), transparent 45%)`
  );

  const onMove = (e) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  if (!enabled) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileHover={{ y: -lift }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`relative ${className}`}
      {...rest}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [.group:hover_&]:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
};

export default TiltCard;
