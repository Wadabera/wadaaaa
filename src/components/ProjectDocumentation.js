import React, { useState } from 'react';
import { 
  FaBook, FaCode, FaRocket, FaCog, FaQuestionCircle, FaDownload,
  FaGithub, FaExternalLinkAlt, FaClipboard, FaCheck, FaPlay,
  FaTerminal, FaDatabase, FaCloud, FaShield, FaUsers
} from 'react-icons/fa';

const ProjectDocumentation = ({ project, isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [copiedCode, setCopiedCode] = useState('');

  const documentationSections = [
    { id: 'overview', label: 'Overview', icon: <FaBook /> },
    { id: 'installation', label: 'Installation', icon: <FaDownload /> },
    { id: 'usage', label: 'Usage', icon: <FaPlay /> },
    { id: 'api', label: 'API Reference', icon: <FaCode /> },
    { id: 'deployment', label: 'Deployment', icon: <FaRocket /> },
    { id: 'configuration', label: 'Configuration', icon: <FaCog /> },
    { id: 'faq', label: 'FAQ', icon: <FaQuestionCircle /> }
  ];

  // Enhanced documentation content
  const documentation = project ? {
    overview: {
      title: 'Project Overview',
      content: `
# ${project?.title}

${project?.description}

## Key Features

${project?.features?.map(feature => `- ${feature}`).join('\n') || '- Feature documentation coming soon'}

## Architecture

This project follows modern software architecture principles with:

- **Modular Design**: Clean separation of concerns
- **Scalable Structure**: Built to handle growth
- **Security First**: Implemented with security best practices
- **Performance Optimized**: Fast and efficient operations

## Technology Stack

${project?.technologies?.map(tech => `- **${tech}**: ${getTechDescription(tech)}`).join('\n') || '- Technology documentation coming soon'}
      `
    },
    installation: {
      title: 'Installation Guide',
      content: `
# Installation

## Prerequisites

Before installing ${project?.title}, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn package manager
- Git

## Quick Start

\`\`\`bash
# Clone the repository
git clone ${project?.github}

# Navigate to project directory
cd ${project?.title?.toLowerCase().replace(/\s+/g, '-')}

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

## Environment Setup

Create a \`.env\` file in the root directory:

\`\`\`env
# Database Configuration
DATABASE_URL=your_database_url
DATABASE_PASSWORD=your_password

# API Keys
API_KEY=your_api_key
SECRET_KEY=your_secret_key

# Application Settings
NODE_ENV=development
PORT=3000
\`\`\`

## Docker Installation

For containerized deployment:

\`\`\`bash
# Build Docker image
docker build -t ${project?.title?.toLowerCase().replace(/\s+/g, '-')} .

# Run container
docker run -p 3000:3000 ${project?.title?.toLowerCase().replace(/\s+/g, '-')}
\`\`\`
      `
    },
    usage: {
      title: 'Usage Examples',
      content: `
# Usage Guide

## Basic Usage

### Getting Started

\`\`\`javascript
import { ${project?.title?.replace(/\s+/g, '')} } from './${project?.title?.toLowerCase().replace(/\s+/g, '-')}';

// Initialize the application
const app = new ${project?.title?.replace(/\s+/g, '')}({
  apiKey: 'your-api-key',
  environment: 'development'
});

// Start the application
app.start();
\`\`\`

### Common Operations

\`\`\`javascript
// Create a new resource
const resource = await app.create({
  name: 'Example Resource',
  type: 'demo',
  data: { key: 'value' }
});

// Retrieve resources
const resources = await app.getAll();

// Update a resource
const updated = await app.update(resource.id, {
  name: 'Updated Resource'
});

// Delete a resource
await app.delete(resource.id);
\`\`\`

## Advanced Features

### Custom Configuration

\`\`\`javascript
const config = {
  database: {
    host: 'localhost',
    port: 5432,
    name: 'myapp'
  },
  cache: {
    enabled: true,
    ttl: 3600
  },
  logging: {
    level: 'info',
    format: 'json'
  }
};

const app = new ${project?.title?.replace(/\s+/g, '')}(config);
\`\`\`

### Event Handling

\`\`\`javascript
// Listen for events
app.on('resource:created', (resource) => {
  console.log('New resource created:', resource);
});

app.on('error', (error) => {
  console.error('Application error:', error);
});
\`\`\`
      `
    },
    api: {
      title: 'API Reference',
      content: `
# API Reference

## Authentication

All API requests require authentication using API keys:

\`\`\`http
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
\`\`\`

## Endpoints

### Resources

#### GET /api/resources
Retrieve all resources

**Parameters:**
- \`limit\` (optional): Number of results to return (default: 10)
- \`offset\` (optional): Number of results to skip (default: 0)
- \`filter\` (optional): Filter criteria

**Response:**
\`\`\`json
{
  "data": [
    {
      "id": "123",
      "name": "Resource Name",
      "type": "demo",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "total": 100,
    "limit": 10,
    "offset": 0
  }
}
\`\`\`

#### POST /api/resources
Create a new resource

**Request Body:**
\`\`\`json
{
  "name": "New Resource",
  "type": "demo",
  "data": {
    "key": "value"
  }
}
\`\`\`

#### PUT /api/resources/:id
Update an existing resource

#### DELETE /api/resources/:id
Delete a resource

## Error Handling

The API uses standard HTTP status codes:

- \`200\` - Success
- \`201\` - Created
- \`400\` - Bad Request
- \`401\` - Unauthorized
- \`404\` - Not Found
- \`500\` - Internal Server Error

Error responses include details:

\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "name",
      "issue": "required"
    }
  }
}
\`\`\`
      `
    },
    deployment: {
      title: 'Deployment Guide',
      content: `
# Deployment

## Production Build

\`\`\`bash
# Create production build
npm run build

# Start production server
npm start
\`\`\`

## Environment Variables

Set the following environment variables for production:

\`\`\`env
NODE_ENV=production
DATABASE_URL=your_production_database_url
API_KEY=your_production_api_key
SECRET_KEY=your_production_secret_key
\`\`\`

## Cloud Deployment

### Heroku

\`\`\`bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create new app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set DATABASE_URL=your_database_url

# Deploy
git push heroku main
\`\`\`

### Vercel

\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
\`\`\`

### AWS

\`\`\`bash
# Using AWS CLI
aws configure
aws s3 sync build/ s3://your-bucket-name
\`\`\`

## Docker Deployment

\`\`\`dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

## Monitoring

Set up monitoring and logging:

- **Health Checks**: \`/health\` endpoint
- **Metrics**: Prometheus integration
- **Logging**: Structured JSON logs
- **Alerts**: Error rate and performance monitoring
      `
    },
    configuration: {
      title: 'Configuration',
      content: `
# Configuration

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| \`NODE_ENV\` | Environment mode | development | No |
| \`PORT\` | Server port | 3000 | No |
| \`DATABASE_URL\` | Database connection string | - | Yes |
| \`API_KEY\` | API authentication key | - | Yes |
| \`SECRET_KEY\` | JWT secret key | - | Yes |
| \`CACHE_TTL\` | Cache time-to-live (seconds) | 3600 | No |
| \`LOG_LEVEL\` | Logging level | info | No |

## Configuration File

Create \`config/app.json\`:

\`\`\`json
{
  "app": {
    "name": "${project?.title}",
    "version": "1.0.0",
    "description": "${project?.description}"
  },
  "server": {
    "port": 3000,
    "host": "localhost",
    "cors": {
      "enabled": true,
      "origins": ["http://localhost:3000"]
    }
  },
  "database": {
    "type": "postgresql",
    "host": "localhost",
    "port": 5432,
    "pool": {
      "min": 2,
      "max": 10
    }
  },
  "cache": {
    "enabled": true,
    "type": "redis",
    "ttl": 3600
  },
  "logging": {
    "level": "info",
    "format": "json",
    "file": "logs/app.log"
  }
}
\`\`\`

## Security Configuration

\`\`\`javascript
const securityConfig = {
  helmet: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"]
      }
    }
  },
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }
};
\`\`\`
      `
    },
    faq: {
      title: 'Frequently Asked Questions',
      content: `
# FAQ

## General Questions

### Q: What is ${project?.title}?
A: ${project?.description}

### Q: What technologies does it use?
A: This project is built with ${project?.technologies?.join(', ')}.

### Q: Is it open source?
A: Yes, the source code is available on [GitHub](${project?.github}).

## Installation & Setup

### Q: What are the system requirements?
A: You need Node.js v16+, npm/yarn, and a modern web browser.

### Q: How do I report bugs?
A: Please create an issue on our [GitHub repository](${project?.github}/issues).

### Q: Can I contribute to the project?
A: Absolutely! Check out our contribution guidelines in the repository.

## Usage Questions

### Q: How do I get started?
A: Follow the installation guide and check out the usage examples.

### Q: Is there a demo available?
A: Yes, you can try the [live demo](${project?.demo}).

### Q: Where can I find more examples?
A: Check the examples directory in the repository and our documentation.

## Technical Questions

### Q: How do I handle authentication?
A: The project supports JWT-based authentication. See the API reference for details.

### Q: Can I customize the configuration?
A: Yes, see the configuration section for all available options.

### Q: How do I deploy to production?
A: Follow our deployment guide for various platforms including Heroku, Vercel, and AWS.

## Troubleshooting

### Q: The application won't start
A: Check that all dependencies are installed and environment variables are set correctly.

### Q: Database connection errors
A: Verify your DATABASE_URL is correct and the database server is running.

### Q: API requests are failing
A: Ensure your API_KEY is valid and check the network connectivity.

## Support

### Q: How can I get help?
A: You can:
- Check this documentation
- Search existing GitHub issues
- Create a new issue
- Contact the maintainers

### Q: Is commercial support available?
A: Please contact us for enterprise support options.
      `
    }
  } : {};

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!isOpen || !project || !documentation[activeSection]) return null;

  const currentDoc = documentation[activeSection] || { title: '', content: '' };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-magazine-card border border-magazine-border rounded-3xl w-full max-w-7xl max-h-[90vh] overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-magazine-border">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${project.color} flex items-center justify-center text-white font-bold text-xl`}>
              <FaBook />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-magazine-text">{project.title} Documentation</h2>
              <p className="text-magazine-muted">Complete project documentation and guides</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-magazine-border/20 hover:bg-accent-yellow hover:text-magazine-bg rounded-xl flex items-center justify-center transition-all duration-300"
            >
              <FaGithub />
            </a>
            <a 
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-magazine-border/20 hover:bg-accent-blue hover:text-white rounded-xl flex items-center justify-center transition-all duration-300"
            >
              <FaExternalLinkAlt />
            </a>
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-magazine-border/20 hover:bg-red-500 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-magazine-border/5 border-r border-magazine-border p-4 overflow-y-auto">
            <nav className="space-y-2">
              {documentationSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 text-left ${
                    activeSection === section.id
                      ? 'bg-accent-yellow text-magazine-bg'
                      : 'text-magazine-muted hover:text-magazine-text hover:bg-magazine-border/10'
                  }`}
                >
                  {section.icon}
                  {section.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8">
              <div className="prose prose-invert max-w-none">
                <div className="markdown-content text-magazine-text">
                  {currentDoc.content.split('\n').map((line, index) => {
                    // Handle headers
                    if (line.startsWith('# ')) {
                      return <h1 key={index} className="text-3xl font-bold text-magazine-text mb-6 mt-8">{line.substring(2)}</h1>;
                    }
                    if (line.startsWith('## ')) {
                      return <h2 key={index} className="text-2xl font-bold text-magazine-text mb-4 mt-6">{line.substring(3)}</h2>;
                    }
                    if (line.startsWith('### ')) {
                      return <h3 key={index} className="text-xl font-bold text-magazine-text mb-3 mt-4">{line.substring(4)}</h3>;
                    }
                    
                    // Handle code blocks
                    if (line.startsWith('```')) {
                      const language = line.substring(3);
                      const codeBlockId = `code-${index}`;
                      return (
                        <div key={index} className="relative bg-gray-900 rounded-xl overflow-hidden my-4">
                          <div className="flex items-center justify-between p-4 border-b border-gray-700">
                            <span className="text-gray-400 text-sm">{language}</span>
                            <button
                              onClick={() => copyToClipboard(line, codeBlockId)}
                              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
                            >
                              {copiedCode === codeBlockId ? <FaCheck /> : <FaClipboard />}
                              <span className="text-sm">{copiedCode === codeBlockId ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    }
                    
                    // Handle regular paragraphs and lists
                    if (line.startsWith('- ')) {
                      return <li key={index} className="text-magazine-muted mb-2">{line.substring(2)}</li>;
                    }
                    
                    if (line.trim() === '') {
                      return <br key={index} />;
                    }
                    
                    // Handle table rows
                    if (line.includes('|')) {
                      const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
                      return (
                        <tr key={index}>
                          {cells.map((cell, cellIndex) => (
                            <td key={cellIndex} className="px-4 py-2 border border-magazine-border text-magazine-muted">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      );
                    }
                    
                    return <p key={index} className="text-magazine-muted mb-4 leading-relaxed">{line}</p>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get technology descriptions
function getTechDescription(tech) {
  const descriptions = {
    'NestJS': 'Progressive Node.js framework for building efficient server-side applications',
    'React': 'JavaScript library for building user interfaces',
    'TypeScript': 'Typed superset of JavaScript',
    'PostgreSQL': 'Advanced open-source relational database',
    'MongoDB': 'NoSQL document database',
    'Python': 'High-level programming language',
    'TensorFlow': 'Open-source machine learning framework',
    'PHP': 'Server-side scripting language',
    'MySQL': 'Open-source relational database',
    'Node.js': 'JavaScript runtime environment'
  };
  return descriptions[tech] || 'Technology used in this project';
}

export default ProjectDocumentation;