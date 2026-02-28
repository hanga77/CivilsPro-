import { Router } from 'express';
import { body } from 'express-validator';
import { login } from '../controllers/authController.js';
import { handleValidationErrors } from '../middleware/validate.js';

const router = Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email invalide'),
    body('password').notEmpty().withMessage('Mot de passe requis'),
    handleValidationErrors,
  ],
  login
);

export default router;
