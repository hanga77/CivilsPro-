import { Router } from 'express';
import { body } from 'express-validator';
import { getIndustries, getIndustry, createIndustry, updateIndustry, deleteIndustry } from '../controllers/industryController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validate.js';

const router = Router();

const industryValidation = [
  body('title').notEmpty().withMessage('Titre requis'),
  body('icon').notEmpty().withMessage('Icône requise'),
  body('description').notEmpty().withMessage('Description requise'),
  handleValidationErrors,
];

router.get('/', getIndustries);
router.get('/:id', getIndustry);
router.post('/', protect, adminOnly, industryValidation, createIndustry);
router.put('/:id', protect, adminOnly, industryValidation, updateIndustry);
router.delete('/:id', protect, adminOnly, deleteIndustry);

export default router;
