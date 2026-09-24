import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaAward,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaUniversity,
  FaBrain,
  FaCode,
  FaServer,
  FaLanguage,
  FaEye,
  FaTimes,
} from "react-icons/fa";
import udacity from "../images/Ai-photo.jpg";
import intern from "../images/intern-certificate.jpg";
import english from "../images/english-cerificate.jpg";
import backend from "../images/portfolio/backend-advanced-certificate.png";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";

const CERTIFICATES = [
  {
    id: 1,
    title: "Artificial Intelligence Fundamentals",
    issuer: "Udacity",
    date: "December 2024",
    description:
      "Nanodegree program covering AI fundamentals, machine learning concepts, and practical applications.",
    image: udacity,
    verificationUrl: "https://www.udacity.com/certificate/ef229b0",
    skills: ["AI", "Machine Learning", "Python", "Data Analysis"],
    icon: <FaBrain />,
    certificateId: "ef229b0",
  },
  {
    id: 2,
    title: "Frontend Development Internship",
    issuer: "Prodigy InfoTech",
    date: "January 2025",
    description:
      "One-month web development internship with outstanding remarks, covering modern frontend technologies.",
    image: intern,
    verificationUrl: "https://prodigyinfotech.dev/certificate/PIT-FEB25-12729",
    skills: ["Frontend", "React", "JavaScript", "Web Dev"],
    icon: <FaCode />,
    certificateId: "PIT/FEB25/12729",
  },
  {
    id: 3,
    title: "Advanced English (American & British)",
    issuer: "H.U Square Language School",
    date: "November 2024",
    description:
      "Six-month advanced English course completion from Beginner to Advanced, recognized as Graduate Student.",
    image: english,
    verificationUrl: "#",
    skills: ["English", "Communication", "Writing"],
    icon: <FaLanguage />,
    certificateId: "08VLQ7DZVJ",
  },
  {
    id: 4,
    title: "Advanced Backend Development",
    issuer: "YAI Software Technology",
    date: "June 2026",
    description:
      "Advanced backend development program covering server-side architecture, APIs, databases, and scalable application design.",
    image: backend,
    verificationUrl: "#",
    skills: ["Backend", "APIs", "Databases", "Node.js"],
    icon: <FaServer />,
    certificateId: "YAI-BACKEND-ADV",
  },
];

const Certificates = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!selected) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);
//this is the est
  return (
    <section id="certificates" className="section-padding relative">
      <div className="container-custom relative z-10">
        <SectionHeading
          eyebrow="Professional Achievements"
          title="My"
          highlight="Certificates"
          subtitle="Certifications validating my expertise in AI, frontend development, and English language."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATES.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <TiltCard max={6} lift={7} className="glass group h-full overflow-hidden">
                <div className="relative aspect-video overflow-hidden bg-surface">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-600 to-brand-800 text-5xl text-white/90">
                    {c.icon}
                  </div>
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                  <span className="absolute left-3 top-3 rounded-lg bg-bg/70 px-2 py-1 font-mono text-xs text-brand-300 backdrop-blur">
                    ID: {c.certificateId}
                  </span>
                  <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white shadow-emerald">
                    <FaAward size={14} />
                  </span>
                </div>

                <div className="space-y-3 p-5">
                  <h3 className="text-lg font-bold text-ink line-clamp-2">
                    {c.title}
                  </h3>
                  <div className="flex flex-col gap-1.5 text-sm">
                    <span className="flex items-center gap-2 text-brand-300">
                      <FaUniversity size={13} /> {c.issuer}
                    </span>
                    <span className="flex items-center gap-2 text-muted">
                      <FaCalendarAlt size={12} /> {c.date}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted line-clamp-2">
                    {c.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.skills.slice(0, 3).map((s) => (
                      <span key={s} className="tech-chip">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => setSelected(c)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand/12 py-2.5 text-sm font-medium text-brand-300 transition-colors hover:bg-brand/20"
                    >
                      <FaEye /> View
                    </button>
                    {c.verificationUrl !== "#" && (
                      <a
                        href={c.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand/50 hover:text-brand-300"
                      >
                        <FaExternalLinkAlt className="text-xs" /> Verify
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              className="glass relative z-10 max-h-[90vh] w-full max-w-3xl overflow-auto p-6"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold text-ink">{selected.title}</h3>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink hover:text-brand-300"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="mb-5 overflow-hidden rounded-xl border border-line">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="max-h-[55vh] w-full object-contain"
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5 text-sm text-muted">
                  <p>
                    <span className="text-brand-300">Issuer:</span>{" "}
                    {selected.issuer}
                  </p>
                  <p>
                    <span className="text-brand-300">Date:</span> {selected.date}
                  </p>
                  <p>
                    <span className="text-brand-300">ID:</span>{" "}
                    {selected.certificateId}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.skills.map((s) => (
                    <span key={s} className="tech-chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              {selected.verificationUrl !== "#" && (
                <a
                  href={selected.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-6"
                >
                  <FaExternalLinkAlt className="text-sm" /> Verify Online
                </a>
              )}
            </motion.div>
          </motion.div>
          //thwere if theere  is the 
          //the hunlemsna
          //the humanytert s :  ;;;;
          //@ts-check//!SECTION
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
