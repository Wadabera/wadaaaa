import React, { useState, useEffect } from 'react';
import { 
  FaChartLine, FaUsers, FaDownload, FaStar, FaEye, FaCode, 
  FaGithub, FaClock, FaCalendar, FaArrowUp, FaArrowDown,
  FaGlobe, FaMobile, FaDesktop, FaTablet
} from 'react-icons/fa';

const ProjectAnalytics = ({ project, isOpen, onClose }) => {
  const [activeMetric, setActiveMetric] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');

  // Mock analytics data - in real app, this would come from your analytics service
  const analyticsData = {
    overview: {
      totalViews: 12547,
      uniqueVisitors: 8932,
      downloads: 2341,
      stars: 47,
      forks: 23,
      issues: 8,
      commits: 156,
      contributors: 4
    },
    traffic: {
      daily: [
        { date: '2024-01-15', views: 234, visitors: 189 },
        { date: '2024-01-16', views: 312, visitors: 245 },
        { date: '2024-01-17', views: 189, visitors: 156 },
        { date: '2024-01-18', views: 445, visitors: 334 },
        { date: '2024-01-19', views: 567, visitors: 423 },
        { date: '2024-01-20', views: 389, visitors: 298 },
        { date: '2024-01-21', views: 678, visitors: 512 }
      ],
      sources: [
        { source: 'Direct', percentage: 45, visitors: 4019 },
        { source: 'GitHub', percentage: 28, visitors: 2501 },
        { source: 'LinkedIn', percentage: 15, visitors: 1340 },
        { source: 'Search', percentage: 8, visitors: 715 },
        { source: 'Other', percentage: 4, visitors: 357 }
      ]
    },
    devices: {
      desktop: 65,
      mobile: 25,
      tablet: 10
    },
    geography: [
      { country: 'United States', percentage: 35, visitors: 3126 },
      { country: 'Ethiopia', percentage: 20, visitors: 1786 },
      { country: 'United Kingdom', percentage: 12, visitors: 1072 },
      { country: 'Germany', percentage: 8, visitors: 715 },
      { country: 'Canada', percentage: 6, visitors: 536 },
      { country: 'Others', percentage: 19, visitors: 1697 }
    ],
    performance: {
      loadTime: 1.2,
      uptime: 99.9,
      errorRate: 0.1,
      responseTime: 245
    }
  };

  const metrics = [
    { id: 'overview', label: 'Overview', icon: <FaChartLine /> },
    { id: 'traffic', label: 'Traffic', icon: <FaEye /> },
    { id: 'devices', label: 'Devices', icon: <FaMobile /> },
    { id: 'geography', label: 'Geography', icon: <FaGlobe /> },
    { id: 'performance', label: 'Performance', icon: <FaClock /> }
  ];

  const timeRanges = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '1y', label: '1 Year' }
  ];

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

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-magazine-card border border-magazine-border rounded-3xl w-full max-w-7xl max-h-[90vh] overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-magazine-border">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${project.color} flex items-center justify-center text-white font-bold text-xl`}>
              <FaChartLine />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-magazine-text">{project.title} Analytics</h2>
              <p className="text-magazine-muted">Project performance and insights</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Time Range Selector */}
            <div className="flex bg-magazine-border/20 rounded-xl p-1">
              {timeRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setTimeRange(range.id)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                    timeRange === range.id
                      ? 'bg-accent-yellow text-magazine-bg'
                      : 'text-magazine-muted hover:text-magazine-text'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
            
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-magazine-border/20 hover:bg-red-500 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300"
            >
              ×
            </button>
          </div>
        </div>

        {/* Metrics Navigation */}
        <div className="flex border-b border-magazine-border overflow-x-auto">
          {metrics.map((metric) => (
            <button
              key={metric.id}
              onClick={() => setActiveMetric(metric.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 whitespace-nowrap ${
                activeMetric === metric.id
                  ? 'text-accent-yellow border-b-2 border-accent-yellow bg-accent-yellow/5'
                  : 'text-magazine-muted hover:text-magazine-text hover:bg-magazine-border/10'
              }`}
            >
              {metric.icon}
              {metric.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeMetric === 'overview' && (
            <OverviewMetrics data={analyticsData.overview} project={project} />
          )}
          {activeMetric === 'traffic' && (
            <TrafficMetrics data={analyticsData.traffic} />
          )}
          {activeMetric === 'devices' && (
            <DeviceMetrics data={analyticsData.devices} />
          )}
          {activeMetric === 'geography' && (
            <GeographyMetrics data={analyticsData.geography} />
          )}
          {activeMetric === 'performance' && (
            <PerformanceMetrics data={analyticsData.performance} />
          )}
        </div>
      </div>
    </div>
  );
};

// Overview Metrics Component
const OverviewMetrics = ({ data, project }) => (
  <div className="space-y-6">
    {/* Key Metrics Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <MetricCard 
        icon={<FaEye />}
        title="Total Views"
        value={data.totalViews.toLocaleString()}
        change="+12.5%"
        positive={true}
        color="from-accent-blue to-accent-purple"
      />
      <MetricCard 
        icon={<FaUsers />}
        title="Unique Visitors"
        value={data.uniqueVisitors.toLocaleString()}
        change="+8.3%"
        positive={true}
        color="from-accent-green to-accent-blue"
      />
      <MetricCard 
        icon={<FaDownload />}
        title="Downloads"
        value={data.downloads.toLocaleString()}
        change="+15.7%"
        positive={true}
        color="from-accent-yellow to-accent-orange"
      />
      <MetricCard 
        icon={<FaStar />}
        title="GitHub Stars"
        value={data.stars}
        change="+3"
        positive={true}
        color="from-accent-pink to-accent-red"
      />
    </div>

    {/* GitHub Stats */}
    <div className="bg-magazine-border/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-magazine-text mb-4 flex items-center gap-2">
        <FaGithub />
        Repository Statistics
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-accent-yellow">{data.forks}</div>
          <div className="text-magazine-muted text-sm">Forks</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent-blue">{data.issues}</div>
          <div className="text-magazine-muted text-sm">Issues</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent-green">{data.commits}</div>
          <div className="text-magazine-muted text-sm">Commits</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent-pink">{data.contributors}</div>
          <div className="text-magazine-muted text-sm">Contributors</div>
        </div>
      </div>
    </div>

    {/* Project Links */}
    <div className="grid md:grid-cols-2 gap-4">
      <a 
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-4 bg-magazine-border/10 rounded-xl hover:bg-magazine-border/20 transition-all duration-300"
      >
        <FaGithub className="text-2xl text-accent-yellow" />
        <div>
          <div className="font-medium text-magazine-text">View Repository</div>
          <div className="text-sm text-magazine-muted">Source code and documentation</div>
        </div>
      </a>
      <a 
        href={project.demo}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-4 bg-magazine-border/10 rounded-xl hover:bg-magazine-border/20 transition-all duration-300"
      >
        <FaEye className="text-2xl text-accent-blue" />
        <div>
          <div className="font-medium text-magazine-text">Live Demo</div>
          <div className="text-sm text-magazine-muted">Try the application</div>
        </div>
      </a>
    </div>
  </div>
);

// Metric Card Component
const MetricCard = ({ icon, title, value, change, positive, color }) => (
  <div className="bg-magazine-border/10 rounded-2xl p-6">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center text-white`}>
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${positive ? 'text-green-500' : 'text-red-500'}`}>
        {positive ? <FaArrowUp /> : <FaArrowDown />}
        {change}
      </div>
    </div>
    <div className="text-2xl font-bold text-magazine-text mb-1">{value}</div>
    <div className="text-magazine-muted text-sm">{title}</div>
  </div>
);

// Traffic Metrics Component
const TrafficMetrics = ({ data }) => (
  <div className="space-y-6">
    {/* Traffic Chart Placeholder */}
    <div className="bg-magazine-border/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-magazine-text mb-4">Daily Traffic</h3>
      <div className="h-64 flex items-end justify-between gap-2">
        {data.daily.map((day, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-gradient-to-t from-accent-yellow to-accent-orange rounded-t-lg mb-2"
              style={{ height: `${(day.views / 700) * 100}%` }}
            ></div>
            <div className="text-xs text-magazine-muted">
              {new Date(day.date).getDate()}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Traffic Sources */}
    <div className="bg-magazine-border/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-magazine-text mb-4">Traffic Sources</h3>
      <div className="space-y-4">
        {data.sources.map((source, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-accent-yellow rounded-full"></div>
              <span className="text-magazine-text">{source.source}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 bg-magazine-border rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-accent-yellow to-accent-orange h-2 rounded-full"
                  style={{ width: `${source.percentage}%` }}
                ></div>
              </div>
              <span className="text-magazine-text font-medium w-12 text-right">
                {source.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Device Metrics Component
const DeviceMetrics = ({ data }) => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-magazine-border/10 rounded-2xl p-6 text-center">
        <FaDesktop className="text-4xl text-accent-blue mx-auto mb-4" />
        <div className="text-3xl font-bold text-magazine-text mb-2">{data.desktop}%</div>
        <div className="text-magazine-muted">Desktop</div>
      </div>
      <div className="bg-magazine-border/10 rounded-2xl p-6 text-center">
        <FaMobile className="text-4xl text-accent-green mx-auto mb-4" />
        <div className="text-3xl font-bold text-magazine-text mb-2">{data.mobile}%</div>
        <div className="text-magazine-muted">Mobile</div>
      </div>
      <div className="bg-magazine-border/10 rounded-2xl p-6 text-center">
        <FaTablet className="text-4xl text-accent-yellow mx-auto mb-4" />
        <div className="text-3xl font-bold text-magazine-text mb-2">{data.tablet}%</div>
        <div className="text-magazine-muted">Tablet</div>
      </div>
    </div>
  </div>
);

// Geography Metrics Component
const GeographyMetrics = ({ data }) => (
  <div className="space-y-6">
    <div className="bg-magazine-border/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-magazine-text mb-4">Visitors by Country</h3>
      <div className="space-y-4">
        {data.map((country, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-4 bg-accent-yellow rounded-sm"></div>
              <span className="text-magazine-text">{country.country}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 bg-magazine-border rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-accent-yellow to-accent-orange h-2 rounded-full"
                  style={{ width: `${country.percentage}%` }}
                ></div>
              </div>
              <span className="text-magazine-text font-medium w-16 text-right">
                {country.visitors.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Performance Metrics Component
const PerformanceMetrics = ({ data }) => (
  <div className="grid md:grid-cols-2 gap-6">
    <MetricCard 
      icon={<FaClock />}
      title="Average Load Time"
      value={`${data.loadTime}s`}
      change="-0.3s"
      positive={true}
      color="from-accent-green to-accent-blue"
    />
    <MetricCard 
      icon={<FaArrowUp />}
      title="Uptime"
      value={`${data.uptime}%`}
      change="+0.1%"
      positive={true}
      color="from-accent-blue to-accent-purple"
    />
    <MetricCard 
      icon={<FaArrowDown />}
      title="Error Rate"
      value={`${data.errorRate}%`}
      change="-0.05%"
      positive={true}
      color="from-accent-yellow to-accent-orange"
    />
    <MetricCard 
      icon={<FaClock />}
      title="Response Time"
      value={`${data.responseTime}ms`}
      change="-15ms"
      positive={true}
      color="from-accent-pink to-accent-red"
    />
  </div>
);

export default ProjectAnalytics;