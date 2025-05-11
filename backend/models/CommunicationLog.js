import mongoose from 'mongoose';

const communicationLogSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'SENT', 'FAILED'], // ✅ Include PENDING here
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true });

const CommunicationLog = mongoose.model('CommunicationLog', communicationLogSchema);
export default CommunicationLog;
