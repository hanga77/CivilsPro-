import { Router } from 'express';
import { body } from 'express-validator';
import { getProjects, getProject, createProject, updateProject, deleteProject } from '../controllers/projectController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validate.js';

const router = Router();

const projectValidation = [
  body('name').notEmpty().withMessage('Nom requis'),
  body('location').notEmpty().withMessage('Localisation requise'),
  body('client').notEmpty().withMessage('Client requis'),
  body('budget').isNumeric().withMessage('Budget doit être un nombre'),
  body('startDate').notEmpty().withMessage('Date de début requise'),
  handleValidationErrors,
];

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', protect, adminOnly, projectValidation, createProject);
router.put('/:id', protect, adminOnly, projectValidation, updateProject);
router.delete('/:id', protect, adminOnly, deleteProject);

export default router;
