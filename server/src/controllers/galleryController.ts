import { Request, Response } from 'express';
import GalleryItem from '../models/GalleryItem.js';

export const getGalleryItems = async (_req: Request, res: Response): Promise<void> => {
  const items = await GalleryItem.find();
  res.json(items);
};

export const createGalleryItem = async (req: Request, res: Response): Promise<void> => {
  const item = await GalleryItem.create(req.body);
  res.status(201).json(item);
};

export const deleteGalleryItem = async (req: Request, res: Response): Promise<void> => {
  const item = await GalleryItem.findByIdAndDelete(req.params.id);
  if (!item) {
    res.status(404).json({ message: 'Élément de galerie introuvable' });
    return;
  }
  res.json({ message: 'Élément supprimé' });
};
