import { Request, Response } from 'express';
import ContactMessage from '../models/ContactMessage.js';

export const getMessages = async (_req: Request, res: Response): Promise<void> => {
  const messages = await ContactMessage.find().sort({ _id: -1 });
  res.json(messages);
};

export const createMessage = async (req: Request, res: Response): Promise<void> => {
  const date = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const message = await ContactMessage.create({ ...req.body, date });
  res.status(201).json(message);
};

export const markAsRead = async (req: Request, res: Response): Promise<void> => {
  const message = await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
  if (!message) {
    res.status(404).json({ message: 'Message introuvable' });
    return;
  }
  res.json(message);
};
