import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { getDb } from '../store/index.js';
import { signToken } from '../middleware/auth.js';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const db = getDb();
    const admin = db.admin;
    if (!admin || admin.email !== email.toLowerCase()) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken({ id: admin._id, email: admin.email });
    res.json({ token, email: admin.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
