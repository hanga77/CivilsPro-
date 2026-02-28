import { Request, Response } from 'express';

export const uploadImage = (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ message: 'Aucun fichier envoyé' });
    return;
  }
  res.json({ url: `/uploads/${req.file.filename}` });
};
