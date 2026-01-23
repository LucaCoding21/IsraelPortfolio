// Shared navigation items
export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

// Services offered
export const services = [
  { name: 'Sports Photography', description: 'Capturing the energy and emotion of the game' },
  { name: 'Event Coverage', description: 'From community gatherings to celebrations' },
  { name: 'Portrait Sessions', description: 'Natural, relaxed portraits that feel like you' },
  { name: 'Lifestyle Shoots', description: 'Everyday moments made memorable' },
] as const;

// Social links
export const socialLinks = {
  instagram: {
    url: 'https://instagram.com/njagih_studios',
    handle: '@njagih_studios',
  },
  email: {
    url: 'mailto:israel.njagih@gmail.com',
    address: 'israel.njagih@gmail.com',
  },
} as const;

// Theme colors (matching CSS variables)
export const colors = {
  background: '#FAFBFC',
  backgroundCool: '#F5F7F5',
  foreground: '#1A2B3C',
  foregroundMuted: '#4A5568',
  accent: '#6B9080',
  accentHover: '#7BA393',
  accentSecondary: '#7C9CB5',
  accentCool: '#A8C5DA',
  muted: '#8899A6',
  card: '#FFFFFF',
  border: '#E2E8F0',
} as const;

// Featured work categories
export const workCategories = [
  'All',
  'Sports',
  'Events',
  'Portraits',
  'Community',
] as const;
