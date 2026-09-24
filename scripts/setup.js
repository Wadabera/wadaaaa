#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Wada Abera Portfolio...\n');

// Create placeholder images if they don't exist
const imagePlaceholders = [
  'images/placeholder-project.png',
  'images/placeholder-avatar.png',
  'images/testimonials/professor.jpg',
  'images/testimonials/manager.jpg',
  'images/testimonials/developer.jpg',
  'images/testimonials/student.jpg',
  'images/portfolio/chella-api.png',
  'images/portfolio/srs-system.png',
  'images/portfolio/vaccination-system.png',
  'images/portfolio/telegram-bot.png',
  'images/portfolio/fruit-classification.png',
  'images/portfolio/tomato-disease.png'
];

// Create directories if they don't exist
const directories = [
  'images/testimonials',
  'images/portfolio'
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Create placeholder files
imagePlaceholders.forEach(imagePath => {
  if (!fs.existsSync(imagePath)) {
    fs.writeFileSync(imagePath, '# Placeholder image - replace with actual image');
    console.log(`📷 Created placeholder: ${imagePath}`);
  }
});

console.log('\n✨ Setup complete! Next steps:');
console.log('1. Replace placeholder images with your actual photos');
console.log('2. Update personal information in src/utils/constants.js');
console.log('3. Add your projects in src/components/Projects.js');
console.log('4. Run "npm start" to start development server');
console.log('\n🎉 Happy coding!');