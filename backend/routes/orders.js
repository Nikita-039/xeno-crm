// routes/orders.js
import express from 'express';
import { createOrder, getAllOrders } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);    // POST /api/orders
router.get('/', getAllOrders);    // GET /api/orders

export default router;
