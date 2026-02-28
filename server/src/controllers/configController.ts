import { Request, Response } from 'express';
import SiteConfig from '../models/SiteConfig.js';

export const getConfig = async (_req: Request, res: Response): Promise<void> => {
  let config = await SiteConfig.findById('singleton');
  if (!config) {
    res.status(404).json({ message: 'Configuration introuvable' });
    return;
  }
  res.json(config);
};

export const updateConfig = async (req: Request, res: Response): Promise<void> => {
  const config = await SiteConfig.findByIdAndUpdate('singleton', req.body, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  });
  res.json(config);
};
