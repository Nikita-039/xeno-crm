// routes/customers.js
import express from 'express';
import { createCustomer, getAllCustomers } from '../controllers/customerController.js';

const router = express.Router();

router.post('/', createCustomer);     // POST /api/customers
router.get('/', getAllCustomers);     // GET /api/customers

export default router;
