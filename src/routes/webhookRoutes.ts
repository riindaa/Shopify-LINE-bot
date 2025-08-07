import express from 'express';
import {
  handleOrderCreationWebhook,
  lineWebhook,
} from '../controllers/webhookController.js';

const router = express.Router();

router.post('/webhook/order-creation', handleOrderCreationWebhook);
router.post('/webhook/line', lineWebhook);

export default router;
