import { Request, Response } from 'express';
import Testimonial from '../models/Testimonial.js';

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  const items = await Testimonial.find();
  res.json(items);
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const item = await Testimonial.create(req.body);
  res.status(201).json(item);
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) { res.status(404).json({ message: 'Non trouvé' }); return; }
  res.json(item);
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ message: 'Supprimé' });
};
