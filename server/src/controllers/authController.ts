import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    return;
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

  res.json({ token, user: user.toJSON() });
};
