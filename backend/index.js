import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // Load env variables

const app = express();

// Middleware
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

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI not found in environment variables');
  process.exit(1);
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

