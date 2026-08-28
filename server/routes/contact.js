import { Router } from 'express';
import { getDb, saveDb, createItem, updateById, deleteById } from '../store/index.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.post('/', (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const db = getDb();
    const contact = createItem(db.messages, { name, email, message, read: false });
    saveDb(db);
    res.status(201).json({ message: 'Message sent successfully', id: contact._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', authMiddleware, (_req, res) => {
  try {
    const db = getDb();
    const messages = [...db.messages].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/:id/read', authMiddleware, (req, res) => {
  try {
    const db = getDb();
    const msg = updateById(db.messages, req.params.id, { read: true });
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    saveDb(db);
    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDb();
    const deleted = deleteById(db.messages, req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Message not found' });
    saveDb(db);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
