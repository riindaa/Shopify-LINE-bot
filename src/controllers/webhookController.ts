import { AxiosError } from 'axios';
import { sendMessage } from '../services/lineService.js';
import { Request, Response } from 'express';

export const handleOrderCreationWebhook = async (
  req: Request,
  res: Response
) => {
  const order = req.body;

  const message = `🧁 New order received!\n\nOrder #${order.name}\nCustomer: ${order.customer?.first_name} ${order.customer?.last_name}\nTotal: ${order.total_price} ${order.currency}`;

  try {
    await sendMessage(message);
    res.status(200).send('Notification sent to LINE');
  } catch (error) {
    const err = error as AxiosError;
    console.error('LINE error:', err.message);
    res.status(500).send('Failed to notify LINE');
  }
};

export const lineWebhook = async (req: Request, res: Response) => {
  console.log('lineWebhook', JSON.stringify(req.body, null, 2));
  res.status(200).send('OK');
};
