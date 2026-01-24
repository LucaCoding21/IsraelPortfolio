// Shared navigation items
export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '#contact' },
] as const;

// Services offered
export const services = [
  { name: 'Weddings', description: 'Your love story, beautifully told' },
  { name: 'Festivals & Sports', description: 'Energy captured in motion' },
  { name: 'Corporate', description: 'Professional imagery that elevates your brand' },
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
