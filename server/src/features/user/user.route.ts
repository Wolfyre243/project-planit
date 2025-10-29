import * as userController from './user.controller.js';
import { verifyJWT } from '../../middleware/auth.middleware.js';

import express from 'express';

const router = express.Router();

// Protect all user routes with authentication middleware
router.use(verifyJWT);

// GET /me - current authenticated user
router.get('/me', userController.getCurrentUser);

export default router;