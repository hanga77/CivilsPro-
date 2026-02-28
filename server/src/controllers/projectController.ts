import { Request, Response } from 'express';
import Project from '../models/Project.js';

export const getProjects = async (_req: Request, res: Response): Promise<void> => {
  const projects = await Project.find();
  res.json(projects);
};

export const getProject = async (req: Request, res: Response): Promise<void> => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404).json({ message: 'Projet introuvable' });
    return;
  }
  res.json(project);
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!project) {
    res.status(404).json({ message: 'Projet introuvable' });
    return;
  }
  res.json(project);
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) {
    res.status(404).json({ message: 'Projet introuvable' });
    return;
  }
  res.json({ message: 'Projet supprimé' });
};
