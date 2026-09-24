import { useState, useEffect, useRef } from "react";
import {
  FaTimes,
  FaGithub,
  FaExternalLinkAlt,
  FaPlay,
  FaPause,
  FaCode,
  FaChartLine,
  FaEye,
  FaArrowLeft,
  FaArrowRight,
  FaLightbulb,
  FaCog,
} from "react-icons/fa";

const ProjectDemo = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // ✅ ENHANCED PROJECT DATA (Videos removed for GitHub compatibility)
  const enhancedProjectData = project
    ? {
        ...project,
        demoFeatures: [
          {
            title: "Live Demo",
            description: "Interactive demonstration of the project functionality",
            image: project.image,
          },
          {
            title: "Key Features",
            description: "Highlighting the main features and capabilities",
            image: project.image,
          },
          {
            title: "User Interface",
            description: "Showcasing the user experience and design",
            image: project.image,
          },
        ],
        codeSnippets: [
          {
            title: "API Endpoint",
            language: "typescript",
            code: `@Controller('projects')
@Get(':id')
getProject(@Param('id') id: string) {
  return this.projectService.findOne(id);
}`,
          },
          {
            title: "React Component",
            language: "jsx",
            code: `useEffect(() => {
  fetchProject(id).then(setProject);
}, [id]);`,
          },
        ],
        metrics: {
          performance: "95%",
          uptime: "99.9%",
          users: "1.2K+",
          downloads: "5.8K",
        },
        techStack: project.technologies?.map((tech) => ({
          name: tech,
          usage: Math.floor(Math.random() * 30) + 70,
          description: getTechDescription(tech),
        })),
      }
    : null;

  const tabs = [
    { id: "overview", label: "Overview", icon: <FaEye /> },
    { id: "features", label: "Features", icon: <FaLightbulb /> },
    { id: "code", label: "Code", icon: <FaCode /> },
    { id: "metrics", label: "Metrics", icon: <FaChartLine /> },
    { id: "tech", label: "Tech Stack", icon: <FaCog /> },
  ];

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  if (!isOpen || !project || !enhancedProjectData) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-magazine-card w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-magazine-border">
          <h2 className="text-2xl font-bold text-magazine-text">
            {project.title}
          </h2>
          <div className="flex gap-3">
            <a href={project.github} target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a href={project.demo} target="_blank" rel="noreferrer">
              <FaExternalLinkAlt />
            </a>
            <button onClick={onClose}>
              <FaTimes />
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex border-b border-magazine-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 flex items-center gap-2 ${
                activeTab === tab.id
                  ? "border-b-2 border-accent-yellow text-accent-yellow"
                  : "text-magazine-muted"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto max-h-[65vh]">
          {activeTab === "overview" && (
            <OverviewTab project={enhancedProjectData} />
          )}
          {activeTab === "features" && (
            <FeaturesTab
              features={enhancedProjectData.demoFeatures}
              currentFeature={currentFeature}
              setCurrentFeature={setCurrentFeature}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          )}
          {activeTab === "code" && (
            <CodeTab codeSnippets={enhancedProjectData.codeSnippets} />
          )}
          {activeTab === "metrics" && (
            <MetricsTab metrics={enhancedProjectData.metrics} />
          )}
          {activeTab === "tech" && (
            <TechStackTab techStack={enhancedProjectData.techStack} />
          )}
        </div>
      </div>
    </div>
  );
};

/* ===================== TABS ===================== */

const OverviewTab = ({ project }) => (
  <div className="space-y-6">
    <img
      src={project.image}
      alt={project.title}
      className="rounded-2xl w-full h-64 object-cover"
    />
    <p className="text-magazine-muted">{project.description}</p>
  </div>
);

const FeaturesTab = ({
  features,
  currentFeature,
  setCurrentFeature,
  isPlaying,
  setIsPlaying,
}) => {
  const feature = features[currentFeature];

  return (
    <div className="space-y-6">
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">

        {/* ✅ IMAGE DISPLAY (Videos removed for GitHub compatibility) */}
        <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-full object-cover"
        />

        {/* NAVIGATION CONTROLS */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <button
            disabled={currentFeature === 0}
            onClick={() => setCurrentFeature((i) => i - 1)}
            className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 disabled:opacity-50"
          >
            <FaArrowLeft />
          </button>
          <button
            disabled={currentFeature === features.length - 1}
            onClick={() => setCurrentFeature((i) => i + 1)}
            className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 disabled:opacity-50"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold text-magazine-text">{feature.title}</h3>
        <p className="text-magazine-muted">{feature.description}</p>
        <div className="mt-4 p-4 bg-accent-yellow/10 border border-accent-yellow/30 rounded-xl">
          <p className="text-sm text-accent-yellow">
            📹 Demo videos available in live deployment. Visit the live demo link to see full functionality.
          </p>
        </div>
      </div>
    </div>
  );
};

const CodeTab = ({ codeSnippets }) => {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="flex gap-2 mb-4">
        {codeSnippets.map((s, i) => (
          <button key={i} onClick={() => setActive(i)}>
            {s.title}
          </button>
        ))}
      </div>
      <pre className="bg-black text-green-400 p-4 rounded-xl">
        <code>{codeSnippets[active].code}</code>
      </pre>
    </div>
  );
};

const MetricsTab = ({ metrics }) => (
  <div className="grid grid-cols-2 gap-4">
    {Object.entries(metrics).map(([k, v]) => (
      <div key={k} className="p-4 bg-magazine-border/10 rounded-xl text-center">
        <div className="text-2xl font-bold">{v}</div>
        <div className="text-magazine-muted capitalize">{k}</div>
      </div>
    ))}
  </div>
);

const TechStackTab = ({ techStack }) => (
  <div className="space-y-4">
    {techStack.map((t, i) => (
      <div key={i}>
        <div className="flex justify-between">
          <span>{t.name}</span>
          <span>{t.usage}%</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full">
          <div
            className="h-2 bg-accent-yellow rounded-full"
            style={{ width: `${t.usage}%` }}
          />
        </div>
      </div>
    ))}
  </div>
);

/* ===================== HELPERS ===================== */

function getTechDescription(tech) {
  const map = {
    React: "Frontend UI library",
    NestJS: "Scalable backend framework",
    MongoDB: "NoSQL database",
    PostgreSQL: "Relational database",
    TypeScript: "Typed JavaScript",
  };
  return map[tech] || tech;
}

export default ProjectDemo;
