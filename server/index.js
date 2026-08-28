import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import { connectDB } from './store/index.js';
import { seedDatabase } from './seed.js';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import skillsRoutes from './routes/skills.js';
import projectsRoutes from './routes/projects.js';
import worldsRoutes from './routes/worlds.js';
import contactRoutes from './routes/contact.js';
import portfolioRoutes from './routes/portfolio.js';
import { authMiddleware } from './middleware/auth.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const uploadsDir = path.join(rootDir, 'public/uploads');
const PORT = process.env.PORT || 5000;
const API_PREFIX = '/api/v1';

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, unique);
  },
});

const upload = multer({ storage });

async function startServer() {
  await connectDB();
  await seedDatabase();

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/uploads', express.static(uploadsDir));

  const api = express.Router();
  api.use('/auth', authRoutes);
  api.use('/profile', profileRoutes);
  api.use('/skills', skillsRoutes);
  api.use('/projects', projectsRoutes);
  api.use('/worlds', worldsRoutes);
  api.use('/contact', contactRoutes);
  api.use('/portfolio', portfolioRoutes);

  api.post('/upload', authMiddleware, upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({ url: `/uploads/${req.file.filename}` });
  });

  api.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use(API_PREFIX, api);

  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}${API_PREFIX}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start API:', err);
  process.exit(1);
});
