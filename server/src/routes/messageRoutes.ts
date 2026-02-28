import { Router } from 'express';
import { body } from 'express-validator';
import { getMessages, createMessage, markAsRead } from '../controllers/messageController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validate.js';

const router = Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Nom requis'),
    body('email').isEmail().withMessage('Email invalide'),
    body('subject').notEmpty().withMessage('Sujet requis'),
    body('message').notEmpty().withMessage('Message requis'),
    handleValidationErrors,
  ],
  createMessage
);

router.get('/', protect, adminOnly, getMessages);
router.put('/:id', protect, adminOnly, markAsRead);

export default router;
