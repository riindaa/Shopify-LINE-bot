const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webhookController");

router.post("/webhook/order-creation", webhookController.handleOrderCreationWebhook);

router.post('/webhook/line', webhookController.lineWebhook);

module.exports = router;