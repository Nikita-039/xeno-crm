import Segment from '../models/Segment.js';
import Campaign from '../models/Campaign.js';
import CommunicationLog from '../models/CommunicationLog.js';
import Customer from '../models/Customer.js';
import { buildMongoQuery } from './utils.js';
import axios from 'axios'; 

export const previewSegment = async (req, res) => {
  try {
    const rules = req.body.rules;

    if (!rules || !Array.isArray(rules)) {
      return res.status(400).json({ message: 'Invalid rules format' });
    }

    const mongoQuery = buildMongoQuery(rules);
    const count = await Customer.countDocuments(mongoQuery);

    res.json({ matchedAudience: count });
  } catch (error) {
    res.status(500).json({ message: 'Error previewing segment', error: error.message });
  }
};


export const saveSegmentAndStartCampaign = async (req, res) => {
  try {
    const { name, rules, createdBy } = req.body;

    if (!name || !rules || !createdBy) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

   
    const segment = await Segment.create({ name, rules, createdBy });


    const mongoQuery = buildMongoQuery(rules);
    const customers = await Customer.find(mongoQuery);

    const campaign = await Campaign.create({
      segmentId: segment._id,
      audienceSize: customers.length,
      sent: 0,
      failed: 0
    });

    
    for (const customer of customers) {
      const log = await CommunicationLog.create({
        customerId: customer._id,
        campaignId: campaign._id,
        status: 'PENDING',
        message: `Hi ${customer.name}, here’s 10% off on your next order!`
      });

      await axios.post('http://localhost:5000/api/vendor/send', {
        customerId: customer._id,
        campaignId: campaign._id,
        logId: log._id,
        message: log.message
      });
    }

    res.json({
      message: 'Segment saved and campaign started successfully (delivery in progress)',
      segmentId: segment._id,
      campaignId: campaign._id
    });
  } catch (err) {
    console.error('Error saving segment:', err.message);
    res.status(500).json({ message: 'Error saving segment', error: err.message });
  }
};

export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .populate('segmentId')
      .sort({ createdAt: -1 });

    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch campaigns', error: err.message });
  }
};

export const deleteCampaign = async (req, res) => {
  try {
    const campaignId = req.params.id;

    await CommunicationLog.deleteMany({ campaignId });

    const campaign = await Campaign.findByIdAndDelete(campaignId);
    if (campaign?.segmentId) {
      await Segment.findByIdAndDelete(campaign.segmentId);
    }

    res.json({ message: 'Campaign deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting campaign', error: err.message });
  }
};




