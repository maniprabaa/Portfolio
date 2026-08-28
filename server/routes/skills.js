import { Router } from 'express';
import { getDb, saveDb, sortByOrder, createItem, updateById, deleteById } from '../store/index.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', (_req, res) => {
  try {
    const db = getDb();
    res.json(sortByOrder(db.skills));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authMiddleware, (req, res) => {
  try {
    const db = getDb();
    const skill = createItem(db.skills, req.body);
    saveDb(db);
    res.status(201).json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDb();
    const skill = updateById(db.skills, req.params.id, req.body);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    saveDb(db);
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDb();
    const deleted = deleteById(db.skills, req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Skill not found' });
    saveDb(db);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
