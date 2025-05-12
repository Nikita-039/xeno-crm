import axios from 'axios';

export const simulateDelivery = async (req, res) => {
  const { customerId, campaignId, logId, message } = req.body;

  setTimeout(async () => {
    const success = Math.random() < 0.9;
    const status = success ? 'SENT' : 'FAILED';

    try {
      await axios.post('http://localhost:5000/api/receipts', {
        logId,
        status
      });
    } catch (err) {
      console.error('Failed to send delivery receipt:', err.message);
    }
  }, 1000);

  res.json({ message: 'Message sent to vendor for simulation' });
};
