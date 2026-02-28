import { Router } from 'express';
import { body } from 'express-validator';
import { getRentals, getRental, createRental, updateRental, deleteRental } from '../controllers/rentalController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validate.js';

const router = Router();

const rentalValidation = [
  body('name').notEmpty().withMessage('Nom requis'),
  body('icon').notEmpty().withMessage('Icône requise'),
  body('price').notEmpty().withMessage('Prix requis'),
  handleValidationErrors,
];

router.get('/', getRentals);
router.get('/:id', getRental);
router.post('/', protect, adminOnly, rentalValidation, createRental);
router.put('/:id', protect, adminOnly, rentalValidation, updateRental);
router.delete('/:id', protect, adminOnly, deleteRental);

export default router;
