import express from 'express';
import upload from '../middleware/upload.js';
import { register, login,fetch_detail } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', upload.single('image'), register);
router.post('/login', login);
router.post('/fetch_detail', fetch_detail);

export default router;
