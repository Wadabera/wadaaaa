import React, { useState, useEffect } from 'react';
import { 
  FaPlay, FaPause, FaExpand, FaCompress, FaVolumeMute, FaVolumeUp,
  FaArrowLeft, FaArrowRight, FaTimes, FaDownload, FaShare
} from 'react-icons/fa';

const ProjectGallery = ({ project, isOpen, onClose }) => {
  const [currentMedia, setCurrentMedia] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Enhanced media gallery for each project
  const mediaGallery = project ? [
    {
      type: 'image',
      src: `/images/gallery/${project.id}/screenshot-1.png`,
      title: 'Main Dashboard',
      description: 'Overview of the main application interface'
    },
    {
      type: 'video',
      src: `/videos/gallery/${project.id}/demo-1.mp4`,
      title: 'Feature Walkthrough',
      description: 'Complete walkthrough of key features'
    },
    {
      type: 'image',
      src: `/images/gallery/${project.id}/screenshot-2.png`,
      title: 'User Interface',
      description: 'Detailed view of user interaction elements'
    },
    {
      type: 'video',
      src: `/videos/gallery/${project.id}/demo-2.mp4`,
      title: 'Performance Demo',
      description: 'Demonstration of application performance'
    },
    {
      type: 'image',
      src: `/images/gallery/${project.id}/screenshot-3.png`,
      title: 'Mobile View',
      description: 'Responsive design on mobile devices'
    }
  ] : [];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          setCurrentMedia(prev => Math.max(0, prev - 1));
          break;
        case 'ArrowRight':
          setCurrentMedia(prev => Math.min(mediaGallery.length - 1, prev + 1));
          break;
        case ' ':
          e.preventDefault();
          setIsPlaying(prev => !prev);
          break;
        case 'f':
          setIsFullscreen(prev => !prev);
          break;
        case 'm':
          setIsMuted(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, onClose]);

  if (!isOpen || !project || mediaGallery.length === 0) return null;

  const currentItem = mediaGallery[currentMedia] || mediaGallery[0];

  return (
    <div className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-sm ${isFullscreen ? 'p-0' : 'p-4'}`}>
      <div className={`relative w-full h-full flex flex-col ${isFullscreen ? '' : 'max-w-7xl mx-auto'}`}>
        
        {/* Header */}
        {!isFullscreen && (
          <div className="flex items-center justify-between p-6 text-white">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${project.color} flex items-center justify-center text-white font-bold text-xl`}>
                {project.title.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{project.title}</h2>
                <p className="text-white/70">{currentItem.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsFullscreen(true)}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300"
              >
                <FaExpand />
              </button>
              <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300">
                <FaShare />
              </button>
              <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300">
                <FaDownload />
              </button>
              <button 
                onClick={onClose}
                className="w-10 h-10 bg-white/10 hover:bg-red-500 rounded-xl flex items-center justify-center transition-all duration-300"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}

        {/* Main Media Display */}
        <div className="flex-1 flex items-center justify-center relative">
          {currentItem.type === 'image' ? (
            <img 
              src={currentItem.src}
              alt={currentItem.title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : (
            <video 
              src={currentItem.src}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              controls={isFullscreen}
              autoPlay={isPlaying}
              muted={isMuted}
              loop
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          )}
          
          {/* Fallback Display */}
          <div className="w-full max-w-2xl h-96 bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 rounded-lg flex flex-col items-center justify-center text-white/50 hidden">
            <div className="text-6xl mb-4">
              {currentItem.type === 'video' ? <FaPlay /> : <div className="w-16 h-16 bg-white/20 rounded-lg"></div>}
            </div>
            <p className="text-xl font-medium">{currentItem.title}</p>
            <p className="text-white/30">{currentItem.description}</p>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={() => setCurrentMedia(Math.max(0, currentMedia - 1))}
            disabled={currentMedia === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30"
          >
            <FaArrowLeft />
          </button>
          
          <button 
            onClick={() => setCurrentMedia(Math.min(mediaGallery.length - 1, currentMedia + 1))}
            disabled={currentMedia === mediaGallery.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30"
          >
            <FaArrowRight />
          </button>

          {/* Video Controls */}
          {currentItem.type === 'video' && !isFullscreen && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/70 rounded-full px-6 py-3">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-300"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-300"
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              <button 
                onClick={() => setIsFullscreen(true)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-300"
              >
                <FaExpand />
              </button>
            </div>
          )}

          {/* Fullscreen Exit */}
          {isFullscreen && (
            <button 
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300"
            >
              <FaCompress />
            </button>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {!isFullscreen && (
          <div className="p-6">
            <div className="flex items-center justify-center gap-4 overflow-x-auto pb-2">
              {mediaGallery.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMedia(index)}
                  className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentMedia 
                      ? 'ring-2 ring-accent-yellow scale-110' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {item.type === 'image' ? (
                    <img 
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : (
                    <video 
                      src={item.src}
                      className="w-full h-full object-cover"
                      muted
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  )}
                  
                  {/* Fallback Thumbnail */}
                  <div className="w-full h-full bg-gradient-to-br from-accent-blue/30 to-accent-purple/30 flex items-center justify-center text-white/50 text-xs hidden">
                    {item.type === 'video' ? <FaPlay /> : <div className="w-4 h-4 bg-white/30 rounded"></div>}
                  </div>
                  
                  {/* Play Icon for Videos */}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 bg-black/50 rounded-full flex items-center justify-center text-white text-xs">
                        <FaPlay />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Media Info */}
            <div className="text-center mt-4 text-white">
              <h3 className="text-lg font-bold mb-1">{currentItem.title}</h3>
              <p className="text-white/70 text-sm">{currentItem.description}</p>
              <div className="flex items-center justify-center gap-4 mt-2 text-xs text-white/50">
                <span>{currentMedia + 1} of {mediaGallery.length}</span>
                <span>•</span>
                <span>{currentItem.type.toUpperCase()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Keyboard Shortcuts Help */}
        <div className="absolute bottom-4 left-4 text-white/50 text-xs hidden lg:block">
          <div className="bg-black/30 rounded-lg p-3 space-y-1">
            <div>← → Navigate</div>
            <div>Space Play/Pause</div>
            <div>F Fullscreen</div>
            <div>M Mute</div>
            <div>Esc Close</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectGallery;