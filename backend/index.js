import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Routes
import segmentRoutes from './routes/segments.js';
import customerRoutes from './routes/customers.js';
import orderRoutes from './routes/orders.js';
import vendorRoutes from './routes/vendor.js';
import receiptRoutes from './routes/receipts.js';
import logRoutes from './routes/logs.js';
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/segments', segmentRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/campaigns', logRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`)))
  .catch(err => console.log(err));
