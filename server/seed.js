import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { connectDB, getDb, saveDb, createId, sortByOrder, createItem } from './store/index.js';

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
  { name: 'HTML', image: '/uploads/html.png', order: 0 },
  { name: 'CSS', image: '/uploads/css.png', order: 1 },
  { name: 'BOOTSTRAP', image: '/uploads/bootstrap.png', order: 2 },
  { name: 'JAVASCRIPT', image: '/uploads/js.png', order: 3 },
  { name: 'REACT JS', image: '/uploads/react.png', order: 4 },
  { name: 'DOCKER', image: '/uploads/docker.png', order: 5 },
  { name: 'NODE JS', image: '/uploads/node.png', order: 6 },
  { name: 'MONGODB', image: '/uploads/mongodb.png', order: 7 },
];

const defaultProjects = [
  { title: 'Anime Watch Website', languages: 'HTML, CSS', description: 'Navigation Bar with Home, Popular, Genres, Contact. Anime details page with title, description, rating, and watch button.', image: '/uploads/animeWebsite.png', order: 0 },
  { title: 'Pokemon Card', languages: 'HTML, CSS', description: 'Pokemon image and name with smooth hover animation.', image: '/uploads/pokemonCard.png', order: 1 },
  { title: 'Carpenter Construction', languages: 'HTML, CSS', description: 'Construction company landing page.', image: '/uploads/carpenter.png', order: 2 },
  { title: 'Business Website', languages: 'HTML, CSS, JavaScript, Bootstrap, React', description: 'Full business website with modern UI.', image: '/uploads/hackthelogic.png', order: 3 },
  { title: 'Add To Cart', languages: 'HTML, CSS, JavaScript, Bootstrap, React', description: 'E-commerce cart functionality.', image: '/uploads/addtocart.png', order: 4 },
  { title: 'Watch Design', languages: 'HTML, CSS, JavaScript, React', description: 'Interactive watch product showcase.', image: '/uploads/watch.png', order: 5 },
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
      codingLanguages: 'HTML, CSS, Bootstrap, JavaScript, React.js, Node.js, Express.js, MongoDB',
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

  if (db.skills.length === 0) {
    db.skills = defaultSkills.map((s) => ({ ...s, _id: createId(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }));
    changed = true;
  }

  if (db.projects.length === 0) {
    db.projects = defaultProjects.map((p) => ({ ...p, _id: createId(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }));
    changed = true;
  }

  if (db.worlds.length === 0) {
    db.worlds = defaultWorlds.map((w) => ({ ...w, _id: createId(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }));
    changed = true;
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
