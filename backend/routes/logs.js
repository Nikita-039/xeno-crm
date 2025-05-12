import express from 'express';
import { getLogsByCampaign } from '../controllers/logController.js';

const router = express.Router();

router.get('/:id/logs', getLogsByCampaign); 

export default router;
