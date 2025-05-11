import express from 'express';
import { getLogsByCampaign } from '../controllers/logController.js';

const router = express.Router();

router.get('/:id/logs', getLogsByCampaign); // /api/campaigns/:id/logs

export default router;
