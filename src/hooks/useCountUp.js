import { useEffect, useRef, useState } from "react";

/**
 * useCountUp — animates a number from 0 to `end` once the element scrolls into
 * view. Returns [ref, value]. Honours prefers-reduced-motion (jumps to end).
 */
const useCountUp = (end, duration = 1600) => {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const run = () => {
      if (started.current) return;
      started.current = true;
      if (reduce) {
        setValue(end);
        return;
      }
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(eased * end));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && run(),
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  return [ref, value];
};

export default useCountUp;
