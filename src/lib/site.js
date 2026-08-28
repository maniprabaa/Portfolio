export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { name: 'Work', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

export const PAGE_LINKS = NAV_LINKS.filter((item) => item.path !== '/');

export const TECH_VOID_URL = 'https://techvoid.praba104016.workers.dev/';
export const TECH_VOID_LOGO = '/techvoid-logo.png';
export const CYBERINTEL_URL = 'https://techvoidcyber.praba104016.workers.dev/';
