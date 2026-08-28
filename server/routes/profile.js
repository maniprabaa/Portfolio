import { Router } from 'express';
import { getDb, saveDb } from '../store/index.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', (_req, res) => {
  try {
    const db = getDb();
    res.json(db.profile || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/', authMiddleware, (req, res) => {
  try {
    const db = getDb();
    db.profile = {
      ...db.profile,
      ...req.body,
      updatedAt: new Date().toISOString(),
    };
    saveDb(db);
    res.json(db.profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
