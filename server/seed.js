import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { connectDB, getDb, saveDb, createId, markDbInitialized, isDbInitialized } from './store/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, '../public/uploads');

const defaultWorlds = [
  { act: 'ACT I', title: 'ORIGIN', description: 'Where the journey begins.', hint: 'Keep walking right →', sectionType: 'intro', order: 0 },
  { act: 'ACT II', title: 'LIVING ATLAS', description: 'The worlds you walked become one map.', hint: 'Keep walking right →', sectionType: 'about', order: 1 },
  { act: 'ACT III', title: 'CRAFT', description: 'Tools gathered along the path.', hint: 'Keep walking right →', sectionType: 'skills', order: 2 },
  { act: 'ACT IV', title: 'CREATIONS', description: 'Works left behind on the trail.', hint: 'Keep walking right →', sectionType: 'projects', order: 3 },
  { act: 'ACT V', title: 'REACH', description: 'Send a message across the map.', hint: 'You made it.', sectionType: 'contact', order: 4 },
];

const defaultSkills = [
  { name: 'HTML', image: '/uploads/html.png', category: 'frontend', order: 0 },
  { name: 'CSS', image: '/uploads/css.png', category: 'frontend', order: 1 },
  { name: 'JavaScript', image: '/uploads/js.png', category: 'frontend', order: 2 },
  { name: 'TypeScript', image: '/uploads/skills/typescript.svg', category: 'frontend', order: 3 },
  { name: 'React', image: '/uploads/react.png', category: 'frontend', order: 4 },
  { name: 'Angular', image: '/uploads/skills/angular.svg', category: 'frontend', order: 5 },
  { name: 'Vue.js', image: '/uploads/skills/vue.svg', category: 'frontend', order: 6 },
  { name: 'Tailwind CSS', image: '/uploads/skills/tailwind.svg', category: 'frontend', order: 7 },
  { name: 'Bootstrap', image: '/uploads/skills/bootstrap.svg', category: 'frontend', order: 8 },
  { name: 'Node.js', image: '/uploads/node.png', category: 'backend', order: 10 },
  { name: 'Express.js', image: '/uploads/skills/express.svg', category: 'backend', order: 11 },
  { name: 'Socket.io', image: '/uploads/skills/socketio.svg', category: 'backend', order: 12 },
  { name: 'Cloudflare', image: '/uploads/skills/cloudflare.svg', category: 'backend', order: 13 },
  { name: 'REST API', image: '/uploads/skills/rest-api.svg', category: 'integration', order: 20 },
  { name: 'JWT Auth', image: '/uploads/skills/jwt.svg', category: 'integration', order: 21 },
  { name: 'API Integration', image: '/uploads/skills/api-integration.svg', category: 'integration', order: 22 },
  { name: 'Razorpay', image: '/uploads/skills/razorpay.svg', category: 'payments', order: 30 },
  { name: 'PhonePe', image: '/uploads/skills/phonepe.svg', category: 'payments', order: 31 },
  { name: 'RevenueCat', image: '/uploads/skills/revenuecat.svg', category: 'payments', order: 32 },
  { name: 'MongoDB', image: '/uploads/mongodb.png', category: 'database', order: 40 },
];

const defaultProjects = [
  { title: 'Anime Watch Website', languages: 'HTML, CSS', description: 'Navigation Bar with Home, Popular, Genres, Contact. Anime details page with title, description, rating, and watch button.', image: '/uploads/animeWebsite.png', order: 0 },
  { title: 'Pokemon Card', languages: 'HTML, CSS', description: 'Pokemon image and name with smooth hover animation.', image: '/uploads/pokemonCard.png', order: 1 },
  { title: 'Carpenter Construction', languages: 'HTML, CSS', description: 'Construction company landing page.', image: '/uploads/carpenter.png', order: 2 },
  { title: 'Business Website', languages: 'HTML, CSS, JavaScript, Bootstrap, React', description: 'Full business website with modern UI.', image: '/uploads/hackthelogic.png', order: 3 },
  { title: 'Add To Cart', languages: 'HTML, CSS, JavaScript, Bootstrap, React', description: 'E-commerce cart functionality.', image: '/uploads/addtocart.png', order: 4 },
  { title: 'Watch Design', languages: 'HTML, CSS, JavaScript, React', description: 'Interactive watch product showcase.', image: '/uploads/watch.png', order: 5 },
  {
    title: 'CyberIntel',
    languages: 'React, Node.js, Express, Cloudflare Workers',
    description: 'Cybersecurity current affairs platform for staying updated on cyber news, threats, and industry events.',
    image: '/uploads/cyberintel.png',
    liveUrl: 'https://techvoidcyber.praba104016.workers.dev/',
    order: 6,
    content:
      'CyberIntel is a cybersecurity intelligence platform built to help professionals stay ahead of threats, vulnerabilities, and breaking security news in one clean dashboard.\n\nThe feed aggregates advisories from sources like CISA, CVE databases, and security research outlets. Each article shows severity badges, source metadata, category tags, and quick actions for reading and saving important updates.\n\nUsers can browse by Latest, Breaking, Vulnerabilities, Threats, Breaches, Malware, CVE, and Research. A searchable library and sidebar navigation make it easy to follow the topics that matter most.',
    highlights: [
      'Real-time cybersecurity news feed with severity labels',
      'Category tabs for CVE, threats, malware, breaches, and research',
      'Searchable library with source and date metadata',
      'Responsive dashboard UI with sidebar navigation',
      'Deployed on Cloudflare Workers for fast global delivery',
    ],
  },
];

function copyAssets() {
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
  const assetsDir = path.join(__dirname, '../src/assets');
  const files = ['html.png', 'css.png', 'bootstrap.png', 'js.png', 'react.png', 'docker.png', 'node.png', 'mongodb.png', 'animeWebsite.png', 'pokemonCard.png', 'carpenter.png', 'hackthelogic.png', 'addtocart.png', 'watch.png', 'profile.jpg', 'praba-Resume.pdf'];
  for (const file of files) {
    const src = path.join(assetsDir, file);
    const dest = path.join(uploadsDir, file);
    if (fs.existsSync(src) && !fs.existsSync(dest)) fs.copyFileSync(src, dest);
  }
}

export async function seedDatabase() {
  await connectDB();
  copyAssets();

  const db = getDb();
  let changed = false;

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (!db.admin) {
    db.admin = {
      _id: createId(),
      email: adminEmail,
      password: await bcrypt.hash(adminPassword, 10),
      createdAt: new Date().toISOString(),
    };
    changed = true;
    console.log(`Admin created: ${adminEmail} / ${adminPassword}`);
  }

  if (!db.profile) {
    db.profile = {
      _id: createId(),
      name: 'Prabakaran',
      tagline: 'Full-Stack Developer',
      subtitle: 'Six worlds become one',
      siteTitle: 'prabakaran.dev',
      intro: 'I have knowledge about real-time projects. I have done functionality and API integration in Admin panel projects. I learned many things on my own about FullStack.',
      age: '22',
      email: 'Praba104016@gmail.com',
      freelance: 'Available',
      codingLanguages:
        'Frontend: HTML, CSS, JavaScript, TypeScript, React, Angular, Vue.js, Tailwind CSS, Bootstrap. Backend: Node.js, Express.js, Socket.io, Cloudflare. Integration: REST API, JWT Auth, API Integration. Payments: Razorpay, PhonePe, RevenueCat. Database: MongoDB.',
      skillTitle: 'Full-Stack Developer',
      experience: '2 Years',
      languages: 'Tamil, English',
      internshipMonths: '6',
      projectsCount: '20+',
      profileImage: '/uploads/profile.jpg',
      resumeUrl: '/uploads/praba-Resume.pdf',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    changed = true;
  }

  if (!isDbInitialized()) {
    if (db.skills.length === 0) {
      db.skills = defaultSkills.map((s) => ({
        ...s,
        _id: createId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      changed = true;
    }

    if (db.projects.length === 0) {
      db.projects = defaultProjects.map((p) => ({
        ...p,
        _id: createId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      changed = true;
    }

    if (db.worlds.length === 0) {
      db.worlds = defaultWorlds.map((w) => ({
        ...w,
        _id: createId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      changed = true;
    }

    markDbInitialized(db);
    changed = true;
  }

  const requiredProjects = defaultProjects.filter((project) => project.title === 'CyberIntel');
  for (const template of requiredProjects) {
    const existing = db.projects.find((project) => project.title === template.title);
    if (!existing) {
      db.projects.push({
        ...template,
        _id: createId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      changed = true;
      continue;
    }

    if (existing.image !== template.image || !existing.content) {
      existing.image = template.image;
      existing.content = template.content;
      existing.highlights = template.highlights;
      existing.liveUrl = template.liveUrl;
      existing.description = template.description;
      existing.languages = template.languages;
      existing.updatedAt = new Date().toISOString();
      changed = true;
    }
  }

  if (changed) {
    saveDb(db);
    console.log('Database seeded');
  }
}

if (process.argv[1]?.replace(/\\/g, '/').endsWith('server/seed.js')) {
  seedDatabase()
    .then(() => {
      console.log('Seed complete');
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
