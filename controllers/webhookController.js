const lineService = require('../services/lineService');

exports.handleOrderCreationWebhook = async (req, res) => {
  const order = req.body;

  const message = `🧁 New order received!\n\nOrder #${order.name}\nCustomer: ${order.customer?.first_name} ${order.customer?.last_name}\nTotal: ${order.total_price} ${order.currency}`;

  try {
    await lineService.sendMessage(message);
    res.status(200).send('Notification sent to LINE');
  } catch (error) {
    console.error('LINE error:', error.message);
    res.status(500).send('Failed to notify LINE');
  }
};

exports.lineWebhook = async (req, res) => {
  console.log('lineWebhook', JSON.stringify(req.body, null, 2));
  res.status(200).send('OK');
};
