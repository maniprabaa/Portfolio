import { Router } from 'express';
import { getDb, mutateDb, sortByOrder, createItem, updateById, deleteById } from '../store/index.js';
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
    const project = mutateDb((db) => createItem(db.projects, req.body));
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', authMiddleware, (req, res) => {
  try {
    const project = mutateDb((db) => {
      const updated = updateById(db.projects, req.params.id, req.body);
      if (!updated) return null;
      return updated;
    });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const deleted = mutateDb((db) => deleteById(db.projects, req.params.id));
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
