import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * LoadingScreen — branded intro overlay. Shows an animated WA monogram and an
 * emerald progress bar, then fades out shortly after mount (or window load).
 * Disables body scroll while visible.
 */
const LoadingScreen = () => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const minTimer = setTimeout(() => setDone(true), 1600);
    const onLoad = () => setTimeout(() => setDone(true), 400);
    window.addEventListener("load", onLoad);
    return () => {
      clearTimeout(minTimer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative mb-8"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-brand/40 bg-brand/10 text-2xl font-extrabold text-brand-300 shadow-emerald">
              WA
            </div>
            <div className="absolute -inset-2 -z-10 rounded-3xl bg-brand/20 blur-xl animate-glow" />
          </motion.div>

          <div className="h-1 w-44 overflow-hidden rounded-full bg-card">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </div>
          <p className="mt-4 text-sm tracking-widest text-muted">
            LOADING PORTFOLIO
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
