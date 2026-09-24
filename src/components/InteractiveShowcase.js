import React, { useState, useEffect, useRef } from 'react';
import { 
  FaPlay, FaPause, FaRedo, FaExpand, FaCode, FaEye, FaCog,
  FaMousePointer, FaKeyboard, FaMobile, FaDesktop, FaTablet
} from 'react-icons/fa';

const InteractiveShowcase = ({ project, isOpen, onClose }) => {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [isInteractive, setIsInteractive] = useState(false);
  const [deviceView, setDeviceView] = useState('desktop');
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);

  // Interactive demo scenarios for each project
  const demoScenarios = project ? [
    {
      title: 'User Registration Flow',
      description: 'Experience the complete user onboarding process',
      interactiveUrl: `https://demo.${project.title.toLowerCase().replace(/\s+/g, '-')}.com/register`,
      steps: [
        'Fill out the registration form',
        'Verify email address',
        'Complete profile setup',
        'Explore dashboard features'
      ]
    },
    {
      title: 'Core Feature Demo',
      description: 'Interact with the main application features',
      interactiveUrl: `https://demo.${project.title.toLowerCase().replace(/\s+/g, '-')}.com/features`,
      steps: [
        'Navigate through main features',
        'Test data input and processing',
        'View real-time updates',
        'Export or share results'
      ]
    },
    {
      title: 'Admin Dashboard',
      description: 'Explore administrative capabilities',
      interactiveUrl: `https://demo.${project.title.toLowerCase().replace(/\s+/g, '-')}.com/admin`,
      steps: [
        'Access admin panel',
        'Manage user accounts',
        'View analytics and reports',
        'Configure system settings'
      ]
    }
  ] : [];

  const devices = [
    { id: 'desktop', name: 'Desktop', icon: <FaDesktop />, width: '100%', height: '600px' },
    { id: 'tablet', name: 'Tablet', icon: <FaTablet />, width: '768px', height: '1024px' },
    { id: 'mobile', name: 'Mobile', icon: <FaMobile />, width: '375px', height: '667px' }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const resetDemo = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
      setIsLoading(true);
    }
  };

  const openInNewTab = () => {
    window.open(demoScenarios[currentDemo].interactiveUrl, '_blank');
  };

  if (!isOpen || !project || demoScenarios.length === 0) return null;

  const currentScenario = demoScenarios[currentDemo] || demoScenarios[0];
  const currentDevice = devices.find(d => d.id === deviceView);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="h-full flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${project.color} flex items-center justify-center text-white font-bold text-xl`}>
              {project.title.charAt(0)}
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{project.title}</h2>
              <p className="text-white/70">Interactive Demo</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Device Selector */}
            <div className="flex bg-white/10 rounded-xl p-1">
              {devices.map((device) => (
                <button
                  key={device.id}
                  onClick={() => setDeviceView(device.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    deviceView === device.id
                      ? 'bg-accent-yellow text-black'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {device.icon}
                  <span className="hidden sm:inline">{device.name}</span>
                </button>
              ))}
            </div>
            
            {/* Controls */}
            <button 
              onClick={resetDemo}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center justify-center transition-all duration-300"
              title="Reset Demo"
            >
              <FaRedo />
            </button>
            
            <button 
              onClick={openInNewTab}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center justify-center transition-all duration-300"
              title="Open in New Tab"
            >
              <FaExpand />
            </button>
            
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-white/10 hover:bg-red-500 text-white rounded-xl flex items-center justify-center transition-all duration-300"
            >
              ×
            </button>
          </div>
        </div>

        {/* Demo Navigation */}
        <div className="flex border-b border-white/10 overflow-x-auto">
          {demoScenarios.map((scenario, index) => (
            <button
              key={index}
              onClick={() => setCurrentDemo(index)}
              className={`flex-shrink-0 px-6 py-4 font-medium transition-all duration-300 ${
                currentDemo === index
                  ? 'text-accent-yellow border-b-2 border-accent-yellow bg-accent-yellow/5'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {scenario.title}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          
          {/* Demo Area */}
          <div className="flex-1 flex items-center justify-center p-6">
            <div 
              className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500"
              style={{ 
                width: currentDevice.width, 
                height: currentDevice.height,
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            >
              {/* Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-accent-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading interactive demo...</p>
                  </div>
                </div>
              )}
              
              {/* Demo iframe */}
              <iframe
                ref={iframeRef}
                src={currentScenario.interactiveUrl}
                className="w-full h-full border-0"
                onLoad={handleIframeLoad}
                onError={() => setIsLoading(false)}
                title={`${project.title} - ${currentScenario.title}`}
              />
              
              {/* Fallback Content */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 flex items-center justify-center hidden">
                <div className="text-center p-8">
                  <div className="text-6xl text-accent-blue/30 mb-4">
                    <FaCode />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Demo Not Available</h3>
                  <p className="text-gray-600 mb-4">This interactive demo is currently being prepared.</p>
                  <button 
                    onClick={() => window.open(project.demo, '_blank')}
                    className="bg-gradient-to-r from-accent-yellow to-accent-orange text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition-all duration-300"
                  >
                    View Live Project
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-white/5 backdrop-blur-sm border-l border-white/10 p-6 overflow-y-auto">
            
            {/* Scenario Info */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {currentScenario.title}
              </h3>
              <p className="text-white/70 text-sm mb-4">
                {currentScenario.description}
              </p>
              
              {/* Interactive Steps */}
              <div className="space-y-3">
                <h4 className="text-white font-medium flex items-center gap-2">
                  <FaMousePointer className="text-accent-yellow" />
                  Try These Steps:
                </h4>
                <ol className="space-y-2">
                  {currentScenario.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-white/70">
                      <span className="w-6 h-6 bg-accent-yellow/20 text-accent-yellow rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Project Info */}
            <div className="border-t border-white/10 pt-6">
              <h4 className="text-white font-medium mb-3">Project Details</h4>
              
              {/* Technologies */}
              <div className="mb-4">
                <p className="text-white/50 text-xs mb-2">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <p className="text-white/50 text-xs mb-2">Key Features</p>
                <ul className="space-y-1">
                  {project.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-white/70">
                      <div className="w-1.5 h-1.5 bg-accent-yellow rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Links */}
              <div className="space-y-2">
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full py-2 px-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 text-sm"
                >
                  <FaCode />
                  View Source Code
                </a>
                <a 
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full py-2 px-3 bg-accent-yellow/20 hover:bg-accent-yellow/30 text-accent-yellow rounded-lg transition-all duration-300 text-sm"
                >
                  <FaEye />
                  Live Project
                </a>
              </div>
            </div>

            {/* Tips */}
            <div className="border-t border-white/10 pt-6 mt-6">
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <FaKeyboard className="text-accent-yellow" />
                Tips
              </h4>
              <ul className="space-y-2 text-xs text-white/60">
                <li>• Use different device views to test responsiveness</li>
                <li>• Click the reset button to restart the demo</li>
                <li>• Open in new tab for full-screen experience</li>
                <li>• Try all interactive elements and forms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveShowcase;