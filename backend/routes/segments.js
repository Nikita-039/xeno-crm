import express from 'express';
import { previewSegment } from '../controllers/segmentController.js';
import { saveSegmentAndStartCampaign } from '../controllers/segmentController.js';
import { getAllCampaigns,  deleteCampaign } from '../controllers/segmentController.js';


const router = express.Router();
router.get('/campaigns', getAllCampaigns); 
router.post('/preview', previewSegment); 
router.post('/save', saveSegmentAndStartCampaign);
router.delete('/campaigns/:id', deleteCampaign);
export default router;
