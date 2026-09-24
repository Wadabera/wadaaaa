import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiNestjs,
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiTensorflow,
  SiNumpy,
  SiPandas,
  SiTypescript,
  SiMongodb,
  SiJupyter,
  SiVisualstudiocode,
  SiPostman,
  SiDocker,
  SiFigma,
} from "react-icons/si";
import {
  FaUsers,
  FaComments,
  FaLightbulb,
  FaClock,
  FaPuzzlePiece,
  FaHandshake,
  FaBrain,
  FaChalkboardTeacher,
} from "react-icons/fa";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";
import SectionHeading from "./ui/SectionHeading";

const CATEGORIES = [
  {
    title: "Frontend",
    icon: <FaReact />,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "HTML5", icon: <FaHtml5 />, level: 95, description: "Semantic markup & accessibility" },
      { name: "CSS3", icon: <FaCss3Alt />, level: 90, description: "Modern styling & animations" },
      { name: "JavaScript", icon: <FaJs />, level: 88, description: "ES6+ & DOM manipulation" },
      { name: "TypeScript", icon: <SiTypescript />, level: 85, description: "Type-safe development" },
      { name: "React.js", icon: <FaReact />, level: 85, description: "Component-based architecture" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, level: 90, description: "Utility-first styling" },
    ],
  },
  {
    title: "Backend",
    icon: <FaNodeJs />,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "PHP", icon: <FaPhp />, level: 88, description: "Server-side scripting" },
      { name: "Node.js", icon: <FaNodeJs />, level: 85, description: "JavaScript runtime" },
      { name: "Express.js", icon: <SiExpress />, level: 80, description: "Web framework" },
      { name: "NestJS", icon: <SiNestjs />, level: 85, description: "Enterprise framework" },
    ],
  },
  {
    title: "Databases",
    icon: <SiMysql />,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "MySQL", icon: <SiMysql />, level: 82, description: "Relational database" },
      { name: "PostgreSQL", icon: <SiPostgresql />, level: 80, description: "Advanced relational DB" },
      { name: "MongoDB", icon: <SiMongodb />, level: 78, description: "NoSQL database" },
    ],
  },
  {
    title: "ML & Data",
    icon: <FaPython />,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Python", icon: <FaPython />, level: 85, description: "Data science & automation" },
      { name: "TensorFlow", icon: <SiTensorflow />, level: 78, description: "Deep learning framework" },
      { name: "NumPy", icon: <SiNumpy />, level: 80, description: "Numerical computing" },
      { name: "Pandas", icon: <SiPandas />, level: 75, description: "Data manipulation" },
      { name: "Jupyter", icon: <SiJupyter />, level: 80, description: "Interactive notebooks" },
    ],
  },
  {
    title: "Tools",
    icon: <FaGitAlt />,
    color: "from-yellow-500 to-orange-500",
    skills: [
      { name: "Git", icon: <FaGitAlt />, level: 85, description: "Version control" },
      { name: "GitHub", icon: <FaGithub />, level: 88, description: "Collaboration platform" },
      { name: "VS Code", icon: <SiVisualstudiocode />, level: 90, description: "Code editor" },
      { name: "Postman", icon: <SiPostman />, level: 85, description: "API testing" },
      { name: "Docker", icon: <SiDocker />, level: 70, description: "Containerization" },
      { name: "Figma", icon: <SiFigma />, level: 75, description: "UI/UX design" },
    ],
  },
];

const SOFT_SKILLS = [
  { name: "Teamwork", icon: <FaUsers /> },
  { name: "Communication", icon: <FaComments /> },
  { name: "Problem Solving", icon: <FaPuzzlePiece /> },
  { name: "Critical Thinking", icon: <FaBrain /> },
  { name: "Creativity", icon: <FaLightbulb /> },
  { name: "Time Management", icon: <FaClock /> },
  { name: "Adaptability", icon: <FaHandshake /> },
  { name: "Leadership", icon: <FaChalkboardTeacher /> },
];

const SkillRow = ({ skill, visible, delay, onHover }) => (
  <motion.div 
    className="group cursor-pointer"
    whileHover={{ scale: 1.02 }}
    onHoverStart={() => onHover?.(skill)}
    onHoverEnd={() => onHover?.(null)}
  >
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <motion.span 
          className="text-xl text-brand-300"
          whileHover={{ scale: 1.2, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {skill.icon}
        </motion.span>
        <div>
          <span className="text-sm font-medium text-ink group-hover:text-brand-300 transition-colors duration-300">{skill.name}</span>
          {skill.description && (
            <motion.p 
              className="text-xs text-muted mt-0.5"
              initial={{ opacity: 0, height: 0 }}
              whileHover={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              {skill.description}
            </motion.p>
          )}
        </div>
      </div>
      <motion.span 
        className="text-xs font-bold text-muted group-hover:text-brand-300 transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
      >
        {skill.level}%
      </motion.span>
    </div>
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-line/60 group-hover:bg-line/80 transition-colors duration-300">
      <motion.div
        className="relative h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-400"
        initial={{ width: 0 }}
        animate={{ width: visible ? `${skill.level}%` : "0%" }}
        transition={{ duration: 1.5, delay: parseFloat(delay) || 0, ease: "easeOut" }}
        whileHover={{ 
          background: "linear-gradient(to right, #10b981, #34d399)",
          boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)"
        }}
      >
        <motion.span 
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  </motion.div>
);

const Skills = () => {
  const [visible, setVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const ref = useRef(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y }}
      >
        <div className="absolute top-40 left-20 w-72 h-72 bg-brand/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </motion.div>

      <div className="container-custom relative z-10">
        <SectionHeading
          eyebrow="Technical Expertise"
          title="My"
          highlight="Skills"
          subtitle="A focused toolkit across frontend, backend, databases, machine learning, and the tools that tie them together."
        />

        <div ref={ref} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, ci) => (
            <Reveal key={cat.title} delay={ci * 0.08}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1, duration: 0.6 }}
              >
                <TiltCard max={8} lift={8} className="glass group h-full p-7 border border-line/50 hover:border-brand/30 transition-all duration-500">
                  <div className="mb-6 flex items-center gap-4">
                    <motion.div 
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-white shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {cat.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-ink group-hover:text-brand-300 transition-colors duration-300">{cat.title}</h3>
                  </div>
                  <div className="space-y-5">
                    {cat.skills.map((skill, si) => (
                      <SkillRow
                        key={skill.name}
                        skill={skill}
                        visible={visible}
                        delay={`${ci * 0.1 + si * 0.05}s`}
                        onHover={setHoveredSkill}
                      />
                    ))}
                  </div>
                  
                  {/* Hover effect overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-brand/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  />
                </TiltCard>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Enhanced Soft Skills */}
        <Reveal delay={0.15}>
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8 flex items-center gap-4">
              <motion.div 
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand/20 to-emerald-500/20 text-brand-300"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaHandshake />
              </motion.div>
              <h3 className="text-xl font-bold text-ink">Soft Skills</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {SOFT_SKILLS.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(16, 185, 129, 0.2)"
                  }}
                  className="glass group flex items-center gap-4 rounded-2xl p-5 border border-line/50 hover:border-brand/30 transition-all duration-300 cursor-pointer"
                >
                  <motion.span 
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand/20 to-emerald-500/20 text-lg text-brand-300"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {skill.icon}
                  </motion.span>
                  <span className="text-sm font-medium text-ink group-hover:text-brand-300 transition-colors duration-300">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Reveal>

        {/* Skill Detail Popup */}
        <AnimatePresence>
          {hoveredSkill && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-8 right-8 glass p-6 rounded-2xl border border-brand/30 shadow-2xl max-w-xs z-50"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl text-brand-300">{hoveredSkill.icon}</span>
                <h4 className="font-bold text-ink">{hoveredSkill.name}</h4>
              </div>
              {hoveredSkill.description && (
                <p className="text-sm text-muted">{hoveredSkill.description}</p>
              )}
              <div className="mt-3 h-2 bg-line/60 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-brand to-emerald-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${hoveredSkill.level}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
