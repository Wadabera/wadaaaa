import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * MagneticButton — the element is gently pulled toward the cursor while hovered
 * and springs back on leave. Disabled on touch / reduced-motion (falls back to
 * a plain element). Render-prop free: pass `as` to choose the tag.
 *
 *   <MagneticButton as="a" href="..." className="btn-primary">…</MagneticButton>
 */
const MagneticButton = ({
  as: Tag = "button",
  strength = 0.35,
  className = "",
  children,
  ...rest
}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  const enabled =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const MotionTag = motion(Tag);

  return (
    <MotionTag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={enabled ? { x: sx, y: sy } : undefined}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export default MagneticButton;
