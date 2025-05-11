import CommunicationLog from '../models/CommunicationLog.js';

export const updateDeliveryStatus = async (req, res) => {
  const { logId, status } = req.body;

  try {
    const log = await CommunicationLog.findByIdAndUpdate(
      logId,
      { status },
      { new: true }
    );
    if (!log) return res.status(404).json({ message: 'Log not found' });

    res.json({ message: 'Status updated', log });
  } catch (err) {
    res.status(500).json({ message: 'Error updating status', error: err.message });
  }
};
