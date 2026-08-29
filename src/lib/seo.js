export const SITE_NAME = 'Prabakaran | Full-Stack Developer';
export const SITE_SHORT_NAME = 'Prabakaran';
export const SITE_DESCRIPTION =
  'Prabakaran is a full-stack developer and founder of TechVoid — building real products from idea to deployment across frontend, backend, APIs, databases, cloud, and CI/CD.';
export const SITE_KEYWORDS = [
  'Prabakaran',
  'Full-Stack Developer',
  'TechVoid',
  'React Developer',
  'Node.js',
  'Portfolio',
  'Web Developer',
  'Cloudflare',
  'JavaScript',
  'TypeScript',
].join(', ');

export const SITE_AUTHOR = 'Prabakaran';
export const SITE_EMAIL = 'Praba104016@gmail.com';
export const SITE_IMAGE = '/techvoid-logo.png';
export const SITE_THEME_COLOR = '#050505';

/** Used for absolute Open Graph URLs. Override with VITE_SITE_URL in production. */
export function getSiteUrl() {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return import.meta.env.VITE_SITE_URL || window.location.origin;
  }
  return import.meta.env.VITE_SITE_URL || 'http://localhost:5173';
}

export const SEO_PAGES = {
  '/': {
    title: 'Prabakaran | Full-Stack Developer & TechVoid Founder',
    description:
      'Full-stack developer building digital products end-to-end — frontend, backend, deployment, and real-world problem solving through TechVoid.',
  },
  '/about': {
    title: 'About | Prabakaran — TechVoid Founder',
    description:
      'Learn about Prabakaran, founder of TechVoid — ownership, problem solving, and building products from idea to production.',
  },
  '/skills': {
    title: 'Skills | Prabakaran — Full-Stack Stack',
    description:
      'Frontend, backend, APIs, payments, databases, and cloud skills used to ship real products.',
  },
  '/projects': {
    title: 'Projects | Prabakaran — Selected Work',
    description:
      'Selected projects including CyberIntel and other full-stack web applications built by Prabakaran.',
  },
  '/contact': {
    title: 'Contact | Prabakaran',
    description:
      'Get in touch with Prabakaran for freelance work, collaborations, or product builds.',
  },
};

export function getSeoForPath(pathname) {
  if (pathname.startsWith('/projects/') && pathname !== '/projects') {
    return {
      title: 'Project Case Study | Prabakaran',
      description: 'Project case study — how the idea was built into a real product.',
    };
  }

  if (pathname.startsWith('/techvoid/admin')) {
    return {
      title: 'Admin | Portfolio Control',
      description: 'Secure portfolio admin panel.',
      noindex: true,
    };
  }

  return (
    SEO_PAGES[pathname] || {
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
    }
  );
}
