/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useRef } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaUser,
  FaSpinner,
  FaRocket,
  FaHeart,
} from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../utils/constants";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import MagneticButton from "./ui/MagneticButton";
// eslint-disable-next-line no-unused-vars
import emailjs from '@emailjs/browser';

const EMPTY = { fullName: "", email: "", subject: "", message: "" };

const Contact = ({ addToast }) => {
  const [form, setForm] = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    // Using EmailJS to send actual emails
    const templateParams = {
      name: form.fullName,
      email: form.email,
      subject: form.subject || "Portfolio Contact",
      message: form.message,
      time: new Date().toLocaleString(),
      to_email: PERSONAL_INFO.email,
    };

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // Fallback to mailto if EmailJS credentials not configured
      console.warn('EmailJS credentials not configured, using mailto fallback');
      const body = `Name: ${form.fullName}\nEmail: ${form.email}\n\n${form.message}`;
      const mailto = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        form.subject || "Portfolio Contact"
      )}&body=${encodeURIComponent(body)}`;
      
      setTimeout(() => {
        window.location.href = mailto;
        setSending(false);
        addToast?.(
          "Your mail app is opening with the message ready to send!",
          "success",
          4000
        );
        setForm(EMPTY);
      }, 600);
      return;
    }

    emailjs.send(serviceId, templateId, templateParams, publicKey)
    .then((result) => {
      setSending(false);
      addToast?.(
        "Message sent successfully! I'll get back to you soon.",
        "success",
        4000
      );
      setForm(EMPTY);
    })
    .catch((error) => {
      setSending(false);
      addToast?.(
        "Failed to send message. Please try again or email directly.",
        "error",
        4000
      );
      console.error('EmailJS Error:', error);
      
      // Fallback to mailto if EmailJS fails
      const body = `Name: ${form.fullName}\nEmail: ${form.email}\n\n${form.message}`;
      const mailto = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        form.subject || "Portfolio Contact"
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  };

  const contactRows = [
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
    },
    {
      icon: <FaPhone />,
      label: "Phone",
      value: PERSONAL_INFO.phone,
      href: `tel:${PERSONAL_INFO.phone}`,
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Location",
      value: PERSONAL_INFO.location,
      href: null,
    },
  ];

  const socials = [
    { icon: <FaGithub />, href: SOCIAL_LINKS.github, label: "GitHub" },
    { icon: <FaLinkedin />, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
    { icon: <FaTelegram />, href: SOCIAL_LINKS.telegram, label: "Telegram" },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y }}
      >
        <div className="absolute top-20 right-20 w-80 h-80 bg-brand/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </motion.div>

      <div className="container-custom relative z-10">
        <SectionHeading
          eyebrow="Let's Work Together"
          title="Get In"
          highlight="Touch"
          subtitle="Have a project, an opportunity, or just want to say hello? My inbox is always open."
        />

        <div className="grid gap-8 lg:gap-10 lg:grid-cols-5">
          {/* Enhanced Info */}
          <Reveal className="lg:col-span-2 order-first lg:order-last">
            <motion.div
              className="glass h-full space-y-6 sm:space-y-8 p-6 sm:p-8 border border-line/50"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <motion.h3 
                  className="text-2xl font-bold text-ink mb-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Let's build something extraordinary
                </motion.h3>
                <p className="text-sm leading-relaxed text-muted">
                  I'm currently open to internships, freelance work, and
                  collaborations. Reach out through the form or any channel
                  below.
                </p>
              </div>

              <div className="space-y-4">
                {contactRows.map((row, index) => {
                  const inner = (
                    <motion.div 
                      className="flex items-center gap-4 rounded-xl border border-line/50 bg-bg/40 p-4 transition-all duration-300 hover:border-brand/40 hover:bg-brand/10 group"
                      whileHover={{ x: 5, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <motion.span
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand/20 to-emerald-500/20 text-brand-300 group-hover:from-brand/30 group-hover:to-emerald-500/30 transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {row.icon}
                      </motion.span>
                      <div className="min-w-0">
                        <div className="text-xs text-muted group-hover:text-brand-300 transition-colors duration-300">{row.label}</div>
                        <div className="truncate text-sm font-medium text-ink group-hover:text-brand-300 transition-colors duration-300">
                          {row.value}
                        </div>
                      </div>
                    </motion.div>
                  );
                  return row.href ? (
                    <a key={row.label} href={row.href} className="block">
                      {inner}
                    </a>
                  ) : (
                    <div key={row.label}>{inner}</div>
                  );
                })}
              </div>

              <div className="flex gap-4 pt-4">
                {socials.map((s, index) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    whileHover={{
                      y: -8,
                      rotate: index % 2 === 0 ? 12 : -12,
                      scale: 1.15,
                      boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-line/50 bg-bg/40 text-muted hover:border-brand/50 hover:text-brand-300"
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </Reveal>

          {/* Enhanced Form */}
          <Reveal delay={0.15} className="lg:col-span-3">
            <motion.form
              onSubmit={handleSubmit}
              className="glass space-y-4 sm:space-y-6 p-6 sm:p-8 border border-line/50"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-medium text-ink"
                  >
                    Name
                  </label>
                  <div className="relative group">
                    <motion.div 
                      className="absolute -inset-0.5 bg-gradient-to-r from-brand to-emerald-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
                    />
                    <div className="relative">
                      <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted group-hover:text-brand-300 transition-colors duration-300" />
                      <input
                        id="fullName"
                        name="fullName"
                        value={form.fullName}
                        onChange={onChange}
                        required
                        placeholder="Your name"
                        className="input-field !pl-11 !border-line/50 group-hover:border-brand/30 transition-colors duration-300"
                        aria-label="Your name"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-ink"
                  >
                    Email
                  </label>
                  <div className="relative group">
                    <motion.div 
                      className="absolute -inset-0.5 bg-gradient-to-r from-brand to-emerald-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
                    />
                    <div className="relative">
                      <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted group-hover:text-brand-300 transition-colors duration-300" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                        required
                        placeholder="you@example.com"
                        className="input-field !pl-11 !border-line/50 group-hover:border-brand/30 transition-colors duration-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-ink"
                >
                  Subject
                </label>
                <div className="relative group">
                  <motion.div 
                    className="absolute -inset-0.5 bg-gradient-to-r from-brand to-emerald-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
                  />
                  <div className="relative">
                    <input
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={onChange}
                      placeholder="What's this about?"
                      className="input-field !border-line/50 group-hover:border-brand/30 transition-colors duration-300"
                      aria-label="Subject"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-ink"
                >
                  Message
                </label>
                <div className="relative group">
                  <motion.div 
                    className="absolute -inset-0.5 bg-gradient-to-r from-brand to-emerald-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
                  />
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      required
                      rows={5}
                      placeholder="Tell me about your project or just say hi…"
                      className="input-field resize-none !border-line/50 group-hover:border-brand/30 transition-colors duration-300"
                      aria-label="Message"
                    />
                  </div>
                </div>
              </div>

              <MagneticButton
                as="button"
                type="submit"
                strength={0.3}
                disabled={sending}
                className="btn-primary w-full disabled:opacity-60 group relative overflow-hidden"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative flex items-center justify-center gap-2">
                  {sending ? (
                    <>
                      <FaSpinner className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <FaRocket className="text-sm" />
                      </motion.div>
                      Send Message
                    </>
                  )}
                </span>
              </MagneticButton>
            </motion.form>
          </Reveal>
        </div>
        
        {/* Enhanced CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 text-2xl font-bold text-ink"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaHeart className="text-brand-300" />
            </motion.span>
            Let's create something amazing together
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
