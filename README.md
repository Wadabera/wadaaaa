# Wada Abera - Portfolio Website

A modern, responsive portfolio website built with React.js and Tailwind CSS, showcasing the work and skills of Wada Abera, a Software Engineering student and Full-Stack Web Developer.

## 🚀 Features

- **Modern Design**: Clean, professional UI with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive**: Dynamic typewriter effect, smooth scrolling, and hover animations
- **Performance Optimized**: Fast loading with optimized images and code
- **SEO Friendly**: Proper meta tags and semantic HTML structure

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Icons**: React Icons
- **Animations**: Framer Motion, CSS animations
- **Build Tool**: Create React App
- **Deployment**: Ready for Netlify/Vercel deployment

## 📁 Project Structure

```
wada-portfolio/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── About.js
│   │   ├── Projects.js
│   │   ├── Skills.js
│   │   ├── Services.js
│   │   ├── Testimonials.js
│   │   ├── Contact.js
│   │   └── Footer.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── images/
├── package.json
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/wadaabera/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📝 Customization

### Personal Information
Update the following files with your personal information:
- `src/components/Hero.js` - Name, titles, and introduction
- `src/components/About.js` - About section content
- `src/components/Contact.js` - Contact information
- `public/index.html` - Meta tags and title

### Projects
Add your projects in `src/components/Projects.js`:
```javascript
const projects = [
  {
    title: 'Your Project',
    category: 'Web/Backend/Machine Learning',
    description: 'Project description',
    technologies: ['Tech1', 'Tech2'],
    github: 'github-link',
    demo: 'demo-link'
  }
];
```

### Skills
Update your skills in `src/components/Skills.js` with your proficiency levels.

### Images
Replace images in the `/images` folder with your own:
- Profile photos
- Project screenshots
- Icons and logos

## 🎨 Styling

The project uses Tailwind CSS for styling. Key design tokens:

- **Primary Colors**: Blue shades (#3b82f6, #2563eb)
- **Secondary Colors**: Gray shades for text and backgrounds
- **Fonts**: Inter (body), Poppins (headings)
- **Animations**: Custom keyframes for typewriter, fade-in effects

## 📱 Sections

1. **Hero**: Introduction with typewriter effect
2. **About**: Personal background and highlights
3. **Projects**: Portfolio showcase with filtering
4. **Skills**: Technical skills with progress bars
5. **Services**: Services offered
6. **Testimonials**: Client/colleague feedback
7. **Contact**: Contact form and information
8. **Footer**: Links and additional info

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify

### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically build and deploy

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Contact

Wada Abera - [wada.abera@example.com](mailto:wada.abera@example.com)

Project Link: [https://github.com/wadaabera/portfolio](https://github.com/wadaabera/portfolio)