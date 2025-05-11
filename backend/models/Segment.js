import mongoose from 'mongoose';

const segmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rules: { type: Array, required: true },
  createdBy: { type: String, required: true }, // email or ID of creator
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Segment', segmentSchema);
