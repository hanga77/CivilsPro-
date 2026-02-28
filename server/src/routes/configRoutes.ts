import { Router } from 'express';
import { body } from 'express-validator';
import { getConfig, updateConfig } from '../controllers/configController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validate.js';

const router = Router();

router.get('/', getConfig);
router.put(
  '/',
  protect,
  adminOnly,
  [
    body('companyName').notEmpty().withMessage('Nom de l\'entreprise requis'),
    handleValidationErrors,
  ],
  updateConfig
);

export default router;
