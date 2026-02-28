import { Request, Response } from 'express';
import TeamMember from '../models/TeamMember.js';

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  const items = await TeamMember.find().sort({ order: 1 });
  res.json(items);
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const item = await TeamMember.create(req.body);
  res.status(201).json(item);
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const item = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) { res.status(404).json({ message: 'Non trouvé' }); return; }
  res.json(item);
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  await TeamMember.findByIdAndDelete(req.params.id);
  res.json({ message: 'Supprimé' });
};
