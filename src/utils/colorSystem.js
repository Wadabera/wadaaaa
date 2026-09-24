// Centralized Color System for Portfolio
export const COLORS = {
  // Primary Brand Colors
  accent: {
    yellow: '#FFD700',
    orange: '#FF6B35', 
    pink: '#FF1B8D',
    purple: '#8B5CF6',
    blue: '#3B82F6',
    green: '#10B981',
    red: '#EF4444'
  },

  // Magazine Theme Colors
  magazine: {
    bg: '#0A0E1A',
    card: '#1A1F2E',
    border: '#2D3748',
    text: '#E2E8F0',
    muted: '#94A3B8'
  },

  // Semantic Colors
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6'
  }
};

// Color Gradients
export const GRADIENTS = {
  primary: 'from-accent-yellow to-accent-orange',
  secondary: 'from-accent-orange to-accent-pink',
  tertiary: 'from-accent-pink to-accent-purple',
  quaternary: 'from-accent-purple to-accent-blue',
  success: 'from-accent-green to-accent-blue',
  rainbow: 'from-accent-yellow via-accent-orange to-accent-pink',
  magazine: 'from-magazine-bg via-magazine-card to-magazine-bg'
};

// Project-specific color schemes
export const PROJECT_COLORS = {
  1: 'from-accent-blue to-accent-purple',
  2: 'from-accent-green to-accent-blue', 
  3: 'from-accent-pink to-accent-red',
  4: 'from-accent-yellow to-accent-orange',
  5: 'from-accent-purple to-accent-pink',
  6: 'from-accent-orange to-accent-red'
};

// Shadow variations
export const SHADOWS = {
  glow: {
    yellow: 'shadow-neon-yellow',
    orange: 'shadow-neon-orange', 
    pink: 'shadow-neon-pink',
    blue: 'shadow-glow',
    default: 'shadow-magazine'
  }
};

// Utility functions
export const getProjectColor = (projectId) => {
  return PROJECT_COLORS[projectId] || GRADIENTS.primary;
};

export const getAccentColor = (type = 'yellow') => {
  return COLORS.accent[type] || COLORS.accent.yellow;
};

export const getGradient = (type = 'primary') => {
  return GRADIENTS[type] || GRADIENTS.primary;
};

export const getShadow = (type = 'default') => {
  return SHADOWS.glow[type] || SHADOWS.glow.default;
};

// Color validation
export const isValidColor = (color) => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

// Color contrast checker
export const getContrastRatio = (color1, color2) => {
  // Simplified contrast ratio calculation
  const getLuminance = (color) => {
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    return 0.299 * r + 0.587 * g + 0.114 * b;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  
  return Math.abs(lum1 - lum2) / 255;
};

// Accessibility helpers
export const getAccessibleTextColor = (backgroundColor) => {
  const contrast = getContrastRatio(backgroundColor, COLORS.magazine.text);
  return contrast > 0.5 ? COLORS.magazine.text : COLORS.magazine.bg;
};

export default {
  COLORS,
  GRADIENTS,
  PROJECT_COLORS,
  SHADOWS,
  getProjectColor,
  getAccentColor,
  getGradient,
  getShadow,
  isValidColor,
  getContrastRatio,
  getAccessibleTextColor
};