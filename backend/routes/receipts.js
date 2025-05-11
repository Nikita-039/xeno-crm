import express from 'express';
import { updateDeliveryStatus } from '../controllers/receiptController.js';

const router = express.Router();
router.post('/', updateDeliveryStatus);
export default router;
