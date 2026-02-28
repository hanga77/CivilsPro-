import { Request, Response } from 'express';
import RentalItem from '../models/RentalItem.js';

export const getRentals = async (_req: Request, res: Response): Promise<void> => {
  const rentals = await RentalItem.find();
  res.json(rentals);
};

export const getRental = async (req: Request, res: Response): Promise<void> => {
  const rental = await RentalItem.findById(req.params.id);
  if (!rental) {
    res.status(404).json({ message: 'Équipement introuvable' });
    return;
  }
  res.json(rental);
};

export const createRental = async (req: Request, res: Response): Promise<void> => {
  const rental = await RentalItem.create(req.body);
  res.status(201).json(rental);
};

export const updateRental = async (req: Request, res: Response): Promise<void> => {
  const rental = await RentalItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!rental) {
    res.status(404).json({ message: 'Équipement introuvable' });
    return;
  }
  res.json(rental);
};

export const deleteRental = async (req: Request, res: Response): Promise<void> => {
  const rental = await RentalItem.findByIdAndDelete(req.params.id);
  if (!rental) {
    res.status(404).json({ message: 'Équipement introuvable' });
    return;
  }
  res.json({ message: 'Équipement supprimé' });
};
