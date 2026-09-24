import { useEffect, useRef, useState } from "react";

/**
 * Enhanced CustomCursor — Premium cursor with dot, trailing ring, glow effects,
 * and intelligent hover states. Desktop/fine-pointer only; never renders on touch
 * devices or when reduced motion is requested. Uses rAF + direct style writes
 * for optimal performance.
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let glowX = mouseX;
    let glowY = mouseY;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const loop = () => {
      // Ring follows with slight delay for smooth effect
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      
      // Glow follows with more delay for ambient effect
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowX}px, ${glowY}px)`;
      }
      
      raf = requestAnimationFrame(loop);
    };

    const grow = () => {
      if (ringRef.current) {
        ringRef.current.classList.add("cursor-grow");
        ringRef.current.classList.add("cursor-glow");
      }
      setIsHovering(true);
    };
    
    const shrink = () => {
      if (ringRef.current) {
        ringRef.current.classList.remove("cursor-grow");
        ringRef.current.classList.remove("cursor-glow");
      }
      setIsHovering(false);
    };

    const onOver = (e) => {
      if (e.target.closest("a, button, [data-cursor], .group, input, textarea")) {
        grow();
      }
    };
    
    const onOut = (e) => {
      if (e.target.closest("a, button, [data-cursor], .group, input, textarea")) {
        shrink();
      }
    };

    const onClick = () => {
      if (ringRef.current) {
        ringRef.current.classList.add("cursor-click");
        setTimeout(() => {
          ringRef.current?.classList.remove("cursor-click");
        }, 150);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("click", onClick);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("click", onClick);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Main dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-1.5 -mt-1.5 h-3 w-3 rounded-full bg-gradient-to-br from-brand to-emerald-400 mix-blend-screen shadow-lg shadow-brand/50"
      />
      
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9998] -ml-4 -mt-4 h-8 w-8 rounded-full border-2 border-brand/40/50 transition-all duration-300 ease-out"
      />
      
      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9997] -ml-8 -mt-8 h-16 w-16 rounded-full bg-gradient-to-br from-brand/20 to-emerald-400/20 blur-xl transition-opacity duration-300"
        style={{ opacity: isHovering ? 0.6 : 0.3 }}
      />
      
      <style>{`
        .cursor-ring.cursor-grow {
          width: 3rem; 
          height: 3rem;
          margin-left: -1.5rem; 
          margin-top: -1.5rem;
          border-color: rgba(16, 185, 129, 0.8);
          background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
        }
        
        .cursor-ring.cursor-glow {
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.3), inset 0 0 10px rgba(16, 185, 129, 0.1);
        }
        
        .cursor-ring.cursor-click {
          transform: scale(0.8) !important;
          border-color: rgba(16, 185, 129, 1) !important;
        }
        
        /* Hide default cursor on interactive elements */
        .has-custom-cursor a, 
        .has-custom-cursor button, 
        .has-custom-cursor [data-cursor],
        .has-custom-cursor input,
        .has-custom-cursor textarea {
          cursor: none;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
