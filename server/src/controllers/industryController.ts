import { Request, Response } from 'express';
import Industry from '../models/Industry.js';

export const getIndustries = async (_req: Request, res: Response): Promise<void> => {
  const industries = await Industry.find();
  res.json(industries);
};

export const getIndustry = async (req: Request, res: Response): Promise<void> => {
  const industry = await Industry.findById(req.params.id);
  if (!industry) {
    res.status(404).json({ message: 'Secteur introuvable' });
    return;
  }
  res.json(industry);
};

export const createIndustry = async (req: Request, res: Response): Promise<void> => {
  const industry = await Industry.create(req.body);
  res.status(201).json(industry);
};

export const updateIndustry = async (req: Request, res: Response): Promise<void> => {
  const industry = await Industry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!industry) {
    res.status(404).json({ message: 'Secteur introuvable' });
    return;
  }
  res.json(industry);
};

export const deleteIndustry = async (req: Request, res: Response): Promise<void> => {
  const industry = await Industry.findByIdAndDelete(req.params.id);
  if (!industry) {
    res.status(404).json({ message: 'Secteur introuvable' });
    return;
  }
  res.json({ message: 'Secteur supprimé' });
};
