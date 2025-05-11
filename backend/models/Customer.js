import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  totalSpend: Number,
  visits: Number,
  lastActive: Date,
});

export default mongoose.model('Customer', customerSchema);
