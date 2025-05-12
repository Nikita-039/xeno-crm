import CommunicationLog from '../models/CommunicationLog.js';


export const getLogsByCampaign = async (req, res) => {
  try {
    const campaignId = req.params.id;

    const logs = await CommunicationLog.find({ campaignId })
      .populate('customerId', 'name email') 
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch logs', error: err.message });
  }
};
