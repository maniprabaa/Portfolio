import { Router } from 'express';
import { getDb, sortByOrder } from '../store/index.js';

const router = Router();

router.get('/', (_req, res) => {
  try {
    const db = getDb();
    res.json({
      profile: db.profile || {},
      skills: sortByOrder(db.skills),
      projects: sortByOrder(db.projects),
      worlds: sortByOrder(db.worlds),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
