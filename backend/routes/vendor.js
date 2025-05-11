import express from 'express';
import { simulateDelivery } from '../controllers/vendorController.js';

const router = express.Router();

router.post('/send', simulateDelivery);

export default router;
