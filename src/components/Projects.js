import React, { useState, useMemo } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaEye,
  FaCode,
  FaHtml5,
  FaReact,
  FaServer,
  FaDatabase,
  FaBrain,
  FaHome,
  FaShoppingCart,
  FaListUl,
  FaGraduationCap,
  FaHeart,
  FaRobot,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaLaptopCode,
  FaRocket,
  FaAward,
} from "react-icons/fa";
import Reveal from "./ui/Reveal";
import ProjectModal from "./ProjectModal";

/**
 * `demoLive` marks demos hosted on platforms that are actually reachable
 * (Netlify, Streamlit, GitHub Pages, Telegram). Dead Heroku links are flagged
 * false so the "Demo" button is hidden and only Source is shown.
 */
const isLiveHost = (url = "") =>
  /netlify\.app|streamlit\.app|github\.io|t\.me|vercel\.app|onrender\.com|drive\.google\.com/i.test(
    url
  );

const RAW_PROJECTS = [
  {
    id: 1,
    title: "Jebu General Trading Website",
    category: "Frontend",
    description:
      "Modern, responsive website for Jebu General Trading Company. Features stunning product showcases, smooth animations, professional business presentation, and optimized user experience for online retail.",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Vercel",
      "Responsive Design",
    ],
    image: "/photos/jebu-screenshot.png",
    fallbackImage:
      "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=1200&h=675&fit=crop&auto=format&q=90",
    githubRepo: "jebu-general-trading",
    demo: "https://jebugeneraltrading.com/",
    features: [
      "Modern UI/UX",
      "Product Showcase",
      "Responsive Design",
      "Fast Performance",
    ],
    color: "from-emerald-500 to-green-600",
    icon: <FaShoppingCart />,
  },
  {
    id: 2,
    title: "Dawolif's - Real Estate & Rental Platform",
    category: "Fullstack",
    description:
      "Full-stack rental marketplace for real estate properties, houses, and cars. Features advanced search/filtering, booking management, secure authentication, property listings, and comprehensive user management system.",
    technologies: ["React", "Express.js", "PostgreSQL", "Node.js", "REST API"],
    image: "/photos/dawolif-screenshot.png",
    fallbackImage:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=675&fit=crop&auto=format&q=90",
    githubRepo: "https://github.com/Wadabera/dawolifes.git",
    demo: "https://dawolife.jebugeneraltrading.com/",
    features: [
      "Property Listings",
      "Booking System",
      "Search & Filter",
      "User Management",
    ],
    color: "from-emerald-500 to-teal-600",
    icon: <FaHome />,
  },
  {
    id: 3,
    title: "Chella Reward API",
    category: "Backend",
    description:
      "Modular rewards platform API with comprehensive features. Includes JWT authentication, role-based access control, real-time WebSocket updates, Docker containerization, and automated CI/CD deployment pipelines.",
    technologies: [
      "NestJS",
      "PostgreSQL",
      "Docker",
      "WebSocket",
      "JWT",
      "CI/CD",
    ],
    image:
      "https://image.thum.io/get/width/1200/crop/675/noanimate/https://chella-gram.vercel.app/",
    fallbackImage:
      "https://images.unsplash.com/photo-1558494949-ef526b0042a0?w=1200&h=675&fit=crop&auto=format&q=90",
    githubRepo: "https://github.com/Wadabera/chelle-api.git",
    demo: "https://chella-gram.vercel.app",
    features: [
      "JWT Auth",
      "Role-Based Access",
      "WebSocket Real-time",
      "RESTful API",
    ],
    color: "from-teal-600 to-emerald-700",
    icon: <FaRobot />,
    company: "Ya'i Software PLC - Certificate Project",
  },
  {
    id: 4,
    title: "Fruit & Vegetable Classifier (ML)",
    category: "Machine Learning",
    description:
      "Real-time image classification achieving 95% accuracy using CNN and transfer learning. Built with Python, TensorFlow, deployed on Streamlit. Features instant classification and comprehensive data visualization.",
    technologies: [
      "Python",
      "TensorFlow",
      "Keras",
      "CNN",
      "Streamlit",
      "OpenCV",
    ],
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=675&fit=crop&auto=format&q=90",
    githubRepo:
      "https://github.com/Wadabera/deep-learning-project-vegetable-fruit-identifier-model_format.git",
    demo: "https://wadabera-deep-learning-project-vegetable-fruit-ident-app-fzysjo.streamlit.app/",
    features: [
      "95% Accuracy",
      "Real-time Classification",
      "Transfer Learning",
      "Interactive UI",
    ],
    color: "from-green-500 to-emerald-600",
    icon: <FaBrain />,
  },
  {
    id: 5,
    title: "E-Commerce Website (Full-Stack)",
    category: "Fullstack",
    description:
      "Complete e-commerce platform with product catalog, shopping cart, secure checkout flow, and React storefront. Backend handles product management, order processing, and comprehensive user account system.",
    technologies: ["React", "Express.js", "MongoDB", "Node.js", "REST API"],
    image:
      "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=1200&h=675&fit=crop&auto=format&q=90",
    githubRepo: "https://github.com/Wadabera/e-commerce-app.git",
    demo: "https://e-commerce-app-client.onrender.com",
    features: [
      "Product Catalog",
      "Shopping Cart",
      "Checkout System",
      "User Accounts",
    ],
    color: "from-emerald-500 to-green-700",
    icon: <FaShoppingCart />,
  },
  {
    id: 6,
    title: "To-Do List App",
    category: "Frontend",
    description:
      "Clean and functional React-based todo list with full CRUD operations. Features local storage persistence, task filtering, priority management, beautiful modern UI design, and smooth animations.",
    technologies: ["React", "JavaScript", "CSS3", "Local Storage", "Hooks"],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=675&fit=crop&auto=format&q=90",
    githubRepo: "https://github.com/Wadabera/Todolist-by-react.git",
    demo: "https://to-do-list-wada.netlify.app",
    features: ["CRUD Operations", "Local Storage", "Task Filters", "Modern UI"],
    color: "from-green-500 to-emerald-600",
    icon: <FaListUl />,
  },
  {
    id: 7,
    title: "HireHub - Job Portal Platform",
    category: "Fullstack",
    description:
      "Complete job portal where companies post jobs and candidates apply easily. Features separate dashboards for candidates, companies, and admin. Includes role-based authentication, application tracking, and responsive UI for seamless recruitment experience.",
    technologies: ["React", "PHP", "PostgreSQL", "Tailwind CSS", "REST API"],
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&h=675&fit=crop&auto=format&q=90",
    githubRepo: "hirehub-job-portal",
    demo: "https://drive.google.com/file/d/1-gfu8jCJohyFIjBeozEJpvo2vErLeMYr/view?usp=drive_link",
    features: [
      "3 Role Dashboards",
      "Secure Authentication",
      "Job Management",
      "Application Tracking",
    ],
    color: "from-emerald-600 to-teal-700",
    icon: <FaGraduationCap />,
    company: "Full-Stack Development",
  },
  {
    id: 8,
    title: "KaKuu MaaMMee - Food Delivery System",
    category: "Fullstack",
    description:
      "Full-stack restaurant and food delivery platform for Oromo traditional food business. Features admin, driver, and customer panels with complete delivery workflow, Google Maps navigation, real-time status updates, and order management.",
    technologies: [
      "PHP",
      "MongoDB",
      "Google Maps API",
      "JavaScript",
      "REST API",
    ],
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&h=675&fit=crop&auto=format&q=90",
    githubRepo: "kakuu-maamee-delivery",
    demo: "https://drive.google.com/file/d/113hNUHnLZCn604ryMu5GBt5fh-64ca3r/view?usp=drive_link",
    features: [
      "Admin Dashboard",
      "Driver Panel",
      "Customer Ordering",
      "Google Maps Integration",
    ],
    color: "from-green-500 to-emerald-700",
    icon: <FaShoppingCart />,
    location: "Addis Ababa, Lideta, Awash Bank Building",
  },
  {
    id: 9,
    title: "Baby & Mothers Vaccination System",
    category: "Fullstack",
    description:
      "Digital healthcare platform for managing vaccination records. Features automated scheduling, reminder notifications, vaccination history tracking, secure patient data management, and role-based access for healthcare providers.",
    technologies: ["React", "NestJS", "PostgreSQL", "Chart.js", "SMS API"],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=675&fit=crop&auto=format&q=90",
    githubRepo:
      "https://github.com/Wadabera/baby-and-mothers-vaccination-is-management-systems.git",
    demo: "https://drive.google.com/file/d/1lmdeVVA1YPBG-Hq7fcZ1TSqYPKI3lZnN/view?usp=sharing",
    features: [
      "Vaccination Scheduling",
      "Automated Reminders",
      "Health Records",
      "Admin Dashboard",
    ],
    color: "from-teal-500 to-green-600",
    icon: <FaHeart />,
  },
  {
    id: 10,
    title: "High School SRS Data Management",
    category: "Fullstack",
    description:
      "Comprehensive student registration system for Jiren Secondary School. Features student profile management, course administration, grade tracking, role-based dashboards, and announcement system for digital transformation.",
    technologies: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=675&fit=crop&auto=format&q=90",
    githubRepo:
      "https://github.com/Wadabera/high-school-srs-data-management-system.git",
    demo: "https://drive.google.com/file/d/1ai499hZCObp7JLOfGVaumk8m3VGxlta_/view?usp=sharing",
    features: [
      "Student Registration",
      "Grade Management",
      "Role-Based Access",
      "Announcement System",
    ],
    color: "from-emerald-500 to-teal-600",
    icon: <FaGraduationCap />,
    location: "Jiren Secondary School, Jimma, Ethiopia",
  },
  {
    id: 11,
    title: "B2B E-Commerce Platform (Backend)",
    category: "Backend",
    description:
      "Complete backend for scalable B2B e-commerce platform. Features secure OTP-based authentication, order management APIs, multi-role B2B workflows, Docker deployment, Redis caching, and CI/CD pipelines.",
    technologies: [
      "NestJS",
      "PostgreSQL",
      "Docker",
      "Redis",
      "CI/CD",
      "OTP Auth",
    ],
    image:
      "https://images.unsplash.com/photo-1558494949-ef526b0042a0?w=1200&h=675&fit=crop&auto=format&q=90",
    githubRepo:
      "https://github.com/Andropia-Electronics-PLC/B2B_Ecommerce_web_appV1_Auth_Module.git",
    demo: "https://b2b-ecommerce-web-appv1-auth-module-1.onrender.com",
    features: [
      "OTP Authentication",
      "Order Management",
      "Multi-Role Access",
      "Docker Deployment",
    ],
    color: "from-green-600 to-emerald-800",
    icon: <FaServer />,
    company: "Andropia PLC - Paid Internship",
  },
  {
    id: 12,
    title: "Ethio Business & Diaspora Platform",
    category: "Backend",
    description:
      "Backend platform connecting Ethiopian diaspora with local businesses. Features business listings, intelligent matchmaking algorithms, cross-border collaboration tools, and comprehensive API integration.",
    technologies: ["NestJS", "MongoDB", "Node.js", "REST API", "Express"],
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=675&fit=crop&auto=format&q=90",
    githubRepo: "https://github.com/Wadabera/busnessman-diaspora-platform.git",
    demo: "https://busnessman-diaspora-platform-7.onrender.com",
    features: [
      "Business Listings",
      "Matchmaking",
      "Collaboration Tools",
      "API Integration",
    ],
    color: "from-green-500 to-teal-600",
    icon: <FaDatabase />,
    company: "Debo Engineering PLC - Internship",
  },
  {
    id: 13,
    title: "Restaurant / Café Management System",
    category: "Fullstack",
    description:
      "Complete management system for restaurants and cafés. Features order management, inventory tracking, POS system, customer service tools, menu management, and comprehensive reporting dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "REST API"],
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=675&fit=crop&auto=format&q=90",
    githubRepo: "https://github.com/Wadabera/restaurant-management.git",
    demo: "",
    features: [
      "Order Management",
      "Inventory Tracking",
      "POS System",
      "Reports & Analytics",
    ],
    color: "from-green-400 to-emerald-600",
    icon: <FaHome />,
  },
  {
    id: 14,
    title: "Car Parking & Washing Management",
    category: "Backend",
    description:
      "Relational database and backend logic for parking and washing services. Features parking slot management, service booking system, automated billing, customer tracking, and comprehensive reporting.",
    technologies: ["Java", "MySQL", "JDBC", "Swing", "MVC"],
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1200&h=675&fit=crop&auto=format&q=90",
    githubRepo: "https://github.com/Wadabera/car-parking-management.git",
    demo: "",
    features: [
      "Parking Management",
      "Booking System",
      "Billing Automation",
      "Service Tracking",
    ],
    color: "from-teal-700 to-green-800",
    icon: <FaDatabase />,
  },
];
const PROJECTS = RAW_PROJECTS.map((p) => ({
  ...p,
  demoLive: isLiveHost(p.demo),
}));

const FILTERS = [
  { name: "All", icon: <FaCode />, color: "from-brand to-emerald-500" },
  { name: "Frontend", icon: <FaHtml5 />, color: "from-orange-500 to-red-500" },
  { name: "React", icon: <FaReact />, color: "from-blue-500 to-cyan-500" },
  {
    name: "Backend",
    icon: <FaServer />,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Fullstack",
    icon: <FaDatabase />,
    color: "from-teal-500 to-emerald-500",
  },
  {
    name: "Machine Learning",
    icon: <FaBrain />,
    color: "from-yellow-500 to-orange-500",
  },
];

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredProject, setHoveredProject] = useState(null);
  const projectsPerPage = 6;
  const sectionRef = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const filtered = useMemo(() => {
    let result =
      filter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === filter);

    if (searchQuery.trim()) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.technologies.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    return result;
  }, [filter, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filtered.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Enhanced Decorative Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y }}
      >
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-emerald-600/20 via-green-600/10 to-transparent" />
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 -left-20 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </motion.div>

      <div className="container-custom relative z-10">
        {/* Professional Feature Banner */}
        <motion.div
          className="relative mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated Background Layers */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-600 rounded-3xl blur-3xl"
            animate={{
              opacity: [0.25, 0.35, 0.25],
              scale: [1, 1.03, 1],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl blur-2xl"
            animate={{
              opacity: [0.15, 0.25, 0.15],
              scale: [1.02, 1, 1.02],
            }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          />

          {/* Main Banner Container */}
          <div className="relative bg-gradient-to-br from-slate-900/95 via-teal-900/90 to-emerald-900/95 rounded-3xl p-6 sm:p-8 md:p-16 text-center shadow-2xl border border-white/10 backdrop-blur-xl overflow-hidden">
            {/* Decorative Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center mb-6"
              >
                <motion.div
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 rounded-full px-5 py-2 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.span
                    className="w-2 h-2 bg-emerald-400 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-emerald-300 text-sm font-semibold tracking-wide">
                    PORTFOLIO SHOWCASE
                  </span>
                </motion.div>
              </motion.div>

              {/* Icon with sophisticated animation */}
              <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.div
                  className="relative"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-xl opacity-50"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.7, 0.5],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 shadow-2xl border border-white/20">
                    <FaRocket className="text-4xl text-white" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Main Heading */}
              <motion.h2
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-teal-200 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </motion.h2>

              {/* Subheading */}
              <motion.p
                className="text-white/80 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Explore my portfolio of innovative web applications, APIs, and
                ML projects that solve real-world problems with cutting-edge
                technology
              </motion.p>

              {/* Stats Row */}
              <motion.div
                className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-12 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {[
                  {
                    label: "Total Projects",
                    value: PROJECTS.length,
                    icon: <FaLaptopCode />,
                  },
                  {
                    label: "Live Demos",
                    value: PROJECTS.filter((p) => p.demoLive).length,
                    icon: <FaExternalLinkAlt />,
                  },
                  { label: "Technologies", value: "15+", icon: <FaAward /> },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="flex items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2 sm:px-5 sm:py-3 border border-white/10"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.span
                      className="text-emerald-400 text-lg sm:text-xl"
                      whileHover={{ rotate: 15, scale: 1.1 }}
                    >
                      {stat.icon}
                    </motion.span>
                    <div className="text-left">
                      <div className="text-xl sm:text-2xl font-bold text-white">
                        {stat.value}
                      </div>
                      <div className="text-xs text-white/60 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <motion.button
                  onClick={() =>
                    document
                      .getElementById("projects-grid")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-8 py-4 rounded-xl shadow-2xl border border-white/20 hover:border-white/40 transition-all"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Explore Projects</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaChevronRight />
                  </motion.span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Search Bar */}
        <Reveal className="mb-12">
          <motion.div
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative group">
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-brand to-emerald-500 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300 blur-md"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="relative w-full pl-4 sm:pl-6 pr-12 sm:pr-14 py-3 sm:py-4 rounded-full glass-3d text-ink placeholder-muted focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 border border-line/50 focus:border-brand/50 text-sm sm:text-base"
              />
              <motion.button
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-white shadow-emerald"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Search"
              >
                <FaSearch />
              </motion.button>
            </div>
          </motion.div>
        </Reveal>

        {/* Enhanced Filters with new design */}
        <Reveal className="mb-12 sm:mb-14">
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {FILTERS.map((f, index) => {
              const count =
                f.name === "All"
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.category === f.name).length;
              const active = filter === f.name;
              return (
                <motion.button
                  key={f.name}
                  onClick={() => {
                    setFilter(f.name);
                    setCurrentPage(1);
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex items-center gap-2 sm:gap-2.5 rounded-full px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold transition-all duration-300 overflow-hidden ${
                    active
                      ? "text-white shadow-2xl"
                      : "glass-3d text-muted hover:text-brand-300 hover:shadow-lg"
                  }`}
                  style={
                    active
                      ? { background: `linear-gradient(to right, ${f.color})` }
                      : {}
                  }
                >
                  <motion.span
                    className={`text-base ${active ? "animate-pulse" : ""}`}
                    whileHover={{ rotate: 15 }}
                  >
                    {f.icon}
                  </motion.span>
                  {f.name}
                  <motion.span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      active ? "bg-white/25" : "bg-brand/20 text-brand-300"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {count}
                  </motion.span>
                  {active && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </Reveal>

        {/* Enhanced Projects Grid */}
        <motion.div
          id="projects-grid"
          layout
          className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-12"
        >
          <AnimatePresence mode="popLayout">
            {currentProjects.map((project, index) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 24,
                  delay: index * 0.08,
                }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <motion.div
                  className="group relative h-full rounded-3xl overflow-hidden"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Enhanced Gradient Border Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90`}
                    animate={{
                      opacity: hoveredProject === project.id ? 1 : 0.7,
                      scale: hoveredProject === project.id ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Inner Container */}
                  <div className="relative m-[3px] h-[calc(100%-6px)] bg-bg rounded-3xl overflow-hidden">
                    {/* Enhanced Project Image/Icon */}
                    <div className="relative aspect-video overflow-hidden">
                      <div
                        className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${project.color} text-7xl text-white/90`}
                      >
                        <motion.span
                          animate={{
                            y: [0, -12, 0],
                            rotate: [0, 8, 0, -8, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          {project.icon}
                        </motion.span>
                      </div>
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                        onLoad={(e) => {
                          e.currentTarget.style.opacity = "1";
                        }}
                        style={{ opacity: "0" }}
                        onError={(e) => {
                          // Fallback to placeholder if screenshot fails
                          if (project.fallbackImage) {
                            e.currentTarget.src = project.fallbackImage;
                            e.currentTarget.style.opacity = "1";
                          }
                        }}
                      />

                      {/* Enhanced Overlay on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-bg via-bg/90 to-transparent"
                        animate={{
                          opacity: hoveredProject === project.id ? 0.95 : 0.6,
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Enhanced Category Badge */}
                      <motion.span
                        className="absolute left-4 top-4 rounded-full bg-white/95 backdrop-blur-sm px-4 py-1.5 text-xs font-bold text-emerald-700 shadow-lg border border-emerald-200"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {project.category}
                      </motion.span>

                      {/* Live Demo Indicator */}
                      {project.demoLive && (
                        <motion.div
                          className="absolute right-4 top-4 flex items-center gap-1.5 bg-red-500/90 backdrop-blur-sm px-3 py-1 rounded-full"
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.9, 1, 0.9],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          <span className="text-xs font-bold text-white">
                            LIVE
                          </span>
                        </motion.div>
                      )}

                      {/* Enhanced Quick View Button */}
                      <motion.button
                        onClick={() => setSelected(project)}
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: hoveredProject === project.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.span
                          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 text-sm font-bold text-white shadow-2xl border border-white/20"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaEye className="text-lg" /> Quick View
                        </motion.span>
                      </motion.button>
                    </div>

                    {/* Enhanced Content */}
                    <div className="p-4 sm:p-6 relative z-10">
                      <motion.h3
                        className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-ink transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 group-hover:bg-clip-text"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {project.title}
                      </motion.h3>
                      <p className="mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed text-muted line-clamp-3">
                        {project.description}
                      </p>

                      {/* Enhanced Tech Stack */}
                      <div className="mb-4 sm:mb-5 flex flex-wrap gap-1.5 sm:gap-2">
                        {project.technologies.slice(0, 4).map((t, i) => (
                          <motion.span
                            key={t}
                            className="rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 px-2 py-0.5 sm:px-3 sm:py-1 text-xs font-medium text-emerald-300 shadow-sm"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05, duration: 0.3 }}
                            whileHover={{
                              scale: 1.15,
                              backgroundColor: "rgba(16, 185, 129, 0.3)",
                              borderColor: "rgba(52, 211, 153, 0.5)",
                            }}
                          >
                            {t}
                          </motion.span>
                        ))}
                        {project.technologies.length > 4 && (
                          <motion.span
                            className="rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-medium text-emerald-300"
                            whileHover={{ scale: 1.1 }}
                          >
                            +{project.technologies.length - 4}
                          </motion.span>
                        )}
                      </div>

                      {/* Enhanced Action Buttons */}
                      <div className="flex gap-2 sm:gap-3">
                        <motion.a
                          href={
                            project.githubRepo.startsWith("http")
                              ? project.githubRepo
                              : `https://github.com/Wadabera/${project.githubRepo}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-700 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-lg border border-white/10"
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)",
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaGithub className="text-sm sm:text-base" /> GitHub
                        </motion.a>
                        {(project.demo || project.demoLive) && (
                          <motion.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-lg border border-white/10"
                            whileHover={{
                              scale: 1.05,
                              boxShadow: "0 20px 40px rgba(20, 184, 166, 0.4)",
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaExternalLinkAlt className="text-xs sm:text-sm" /> Live Demo
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <Reveal>
            <motion.div
              className="flex items-center justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                  currentPage === 1
                    ? "glass-3d text-muted/40 cursor-not-allowed"
                    : "glass-3d text-ink hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/30"
                }`}
                whileHover={currentPage !== 1 ? { scale: 1.1 } : {}}
                whileTap={currentPage !== 1 ? { scale: 0.9 } : {}}
              >
                <FaChevronLeft />
              </motion.button>

              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                // Show first, last, current, and adjacent pages
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <motion.button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`flex items-center justify-center w-12 h-12 rounded-xl font-bold transition-all duration-300 ${
                        currentPage === pageNum
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/50 scale-110"
                          : "glass-3d text-ink hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 hover:text-white hover:scale-105 hover:shadow-lg"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {pageNum}
                    </motion.button>
                  );
                } else if (
                  pageNum === currentPage - 2 ||
                  pageNum === currentPage + 2
                ) {
                  return (
                    <span
                      key={pageNum}
                      className="text-muted px-2 font-semibold"
                    >
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <motion.button
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                  currentPage === totalPages
                    ? "glass-3d text-muted/40 cursor-not-allowed"
                    : "glass-3d text-ink hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/30"
                }`}
                whileHover={currentPage !== totalPages ? { scale: 1.1 } : {}}
                whileTap={currentPage !== totalPages ? { scale: 0.9 } : {}}
              >
                <FaChevronRight />
              </motion.button>
            </motion.div>
          </Reveal>
        )}

        {/* Enhanced No Results Message */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <motion.div
              className="text-7xl mb-6 text-muted/30"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔍
            </motion.div>
            <h3 className="text-3xl font-bold text-ink mb-3">
              No projects found
            </h3>
            <p className="text-muted text-lg">
              Try adjusting your search or filter to discover more projects
            </p>
            <motion.button
              onClick={() => {
                setSearchQuery("");
                setFilter("All");
                setCurrentPage(1);
              }}
              className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-brand to-emerald-500 text-white font-semibold shadow-lg hover:shadow-emerald-500/30 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default Projects;
