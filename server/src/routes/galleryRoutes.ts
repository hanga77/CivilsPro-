import { Router } from 'express';
import { body } from 'express-validator';
import { getGalleryItems, createGalleryItem, deleteGalleryItem } from '../controllers/galleryController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validate.js';

const router = Router();

router.get('/', getGalleryItems);
router.post(
  '/',
  protect,
  adminOnly,
  [
    body('category').notEmpty().withMessage('Catégorie requise'),
    body('url').notEmpty().withMessage('URL requise'),
    body('title').notEmpty().withMessage('Titre requis'),
    handleValidationErrors,
  ],
  createGalleryItem
);
router.delete('/:id', protect, adminOnly, deleteGalleryItem);

export default router;
