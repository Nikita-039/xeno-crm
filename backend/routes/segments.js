import express from 'express';
import { previewSegment } from '../controllers/segmentController.js';
import { saveSegmentAndStartCampaign } from '../controllers/segmentController.js';
import { getAllCampaigns,  deleteCampaign } from '../controllers/segmentController.js';


const router = express.Router();
router.get('/campaigns', getAllCampaigns); // GET /api/segments/campaigns
router.post('/preview', previewSegment); // POST /api/segments/preview
router.post('/save', saveSegmentAndStartCampaign); // POST /api/segments/save
router.delete('/campaigns/:id', deleteCampaign);
export default router;
