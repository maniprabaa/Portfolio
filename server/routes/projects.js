import { Router } from 'express';
import { getDb, saveDb, sortByOrder, createItem, updateById, deleteById } from '../store/index.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', (_req, res) => {
  try {
    const db = getDb();
    res.json(sortByOrder(db.projects));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authMiddleware, (req, res) => {
  try {
    const db = getDb();
    const project = createItem(db.projects, req.body);
    saveDb(db);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDb();
    const project = updateById(db.projects, req.params.id, req.body);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    saveDb(db);
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDb();
    const deleted = deleteById(db.projects, req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    saveDb(db);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
