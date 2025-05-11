import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  segmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Segment' },
  audienceSize: Number,
  sent: Number,
  failed: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Campaign', campaignSchema);
