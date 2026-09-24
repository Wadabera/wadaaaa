import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaTimes,
  FaGithub,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaPlay,
} from "react-icons/fa";

/**
 * ProjectModal — glassmorphism popup with an image carousel, full description,
 * complete tech stack, feature list, and Demo / Source actions.
 * Closes on backdrop click, the X button, or Escape. Locks body scroll.
 */
const ProjectModal = ({ project, onClose }) => {
  const open = Boolean(project);
  const images = project
    ? project.screenshots?.length
      ? project.screenshots
      : [project.image]
    : [];
  const videoEmbedUrl = getYouTubeEmbedUrl(project?.videoDemo);
  const [slide, setSlide] = useState(0);

  useEffect(() => setSlide(0), [project]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, project]);

  const next = useCallback(
    () => setSlide((s) => (s + 1) % images.length),
    [images.length]
  );
  const prev = useCallback(
    () => setSlide((s) => (s - 1 + images.length) % images.length),
    [images.length]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            className="glass relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden"
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg/70 text-ink backdrop-blur-md transition-colors hover:text-brand-300"
            >
              <FaTimes />
            </button>

            {/* Carousel */}
            <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-surface">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  project.color || "from-brand-600 to-brand-800"
                } flex items-center justify-center text-7xl text-white/90`}
              >
                {project.icon}
              </div>
              <AnimatePresence mode="wait">
                <motion.img
                  key={slide}
                  src={images[slide]}
                  alt={`${project.title} screenshot ${slide + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-bg/70 text-ink backdrop-blur hover:text-brand-300"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-bg/70 text-ink backdrop-blur hover:text-brand-300"
                  >
                    <FaChevronRight />
                  </button>
                  <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSlide(i)}
                        aria-label={`Go to image ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                          i === slide ? "w-5 bg-brand" : "w-1.5 bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Body */}
            <div className="overflow-y-auto p-6">
              <span className="tech-chip mb-3 inline-block">
                {project.category}
              </span>
              <h3 className="text-2xl font-bold text-ink">{project.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">
                {project.description}
              </p>

              {videoEmbedUrl && (
                <div className="mt-5 overflow-hidden rounded-xl border border-line bg-surface">
                  <iframe
                    className="aspect-video w-full"
                    src={videoEmbedUrl}
                    title={`${project.title} YouTube demo`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              )}

              {project.features?.length > 0 && (
                <div className="mt-5">
                  <h4 className="mb-2 text-sm font-semibold text-ink">
                    Key Features
                  </h4>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {project.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-muted"
                      >
                        <FaCheckCircle className="shrink-0 text-brand-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-5">
                <h4 className="mb-2 text-sm font-semibold text-ink">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span key={t} className="tech-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.videoDemo && (
                  <a
                    href={project.videoDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 sm:flex-none"
                  >
                    <FaPlay className="text-sm" />
                    {project.videoLabel || "YouTube Demo"}
                  </a>
                )}
                {project.demo && project.demoLive && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex-1 sm:flex-none"
                  >
                    <FaExternalLinkAlt className="text-sm" />
                    View Demo
                  </a>
                )}
                <a
                  href={`https://github.com/Wadabera/${project.githubRepo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex-1 sm:flex-none"
                >
                  <FaGithub className="text-sm" />
                  View Source Code
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function getYouTubeEmbedUrl(url) {
  if (!url) return "";

  try {
    const parsed = new URL(url);
    let videoId = "";

    if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.replace("/", "");
    } else if (parsed.hostname.includes("youtube.com")) {
      videoId = parsed.searchParams.get("v") || "";
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  } catch {
    return ""; 
  }
}

export default ProjectModal;
