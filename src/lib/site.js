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

export const GITHUB_URL = 'https://github.com/maniprabaa';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/praba-karan-804228253/';

export const SOCIAL_LINKS = [
  { name: 'GitHub', href: GITHUB_URL },
  { name: 'LinkedIn', href: LINKEDIN_URL },
];

export const ADMIN_BASE = '/techvoid/admin';
export const ADMIN_LOGIN = '/techvoid/admin/login';
