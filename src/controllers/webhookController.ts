import { AxiosError } from 'axios';
import { sendMessage } from '../services/lineService.js';
import { Request, Response } from 'express';

export const handleOrderCreationWebhook = async (
  req: Request,
  res: Response
) => {
  const order = req.body;

  const shippingAddress = order.shipping_address || {};
  const customer = order.customer || {};
  const defaultAddress = customer.default_address || {};
  const orderLink = `https://admin.shopify.com/store/fdchvz-pk/orders/${order.id}`;

  const deliveryOrPickUpMethod =
    order.note_attributes.find((note: any) =>
      note.name?.toLowerCase().includes('delivery method')
    )?.value || 'N/A';

  const deliveryOrPickUpDate =
    order.note_attributes.find((note: any) =>
      note.name?.toLowerCase().includes('delivery date')
    )?.value || 'N/A';

  const deliveryOrPickupTime =
    order.note_attributes.find((note: any) =>
      note.name?.toLowerCase().includes('delivery time')
    )?.value || 'N/A';

  const lineItems = order.line_items || [];
  const itemMessages = lineItems
    .map((item: any, index: number) => {
      const properties = item.properties || [];
      const birthdayMessage =
        properties.find((p: any) => p.name?.toLowerCase().includes('message'))
          ?.value || 'N/A';

      return `Item ${index + 1}:
  - Cake: ${item.title || 'N/A'}
  - Size: ${item.variant_title || 'N/A'}
  - Birthday message: ${birthdayMessage}`;
    })
    .join('\n\n');

  const message = `🧁 New Order: ${order.name}
Customer name: ${customer.first_name || 'N/A'} ${customer.last_name || ''}
Phone number: ${defaultAddress.phone || shippingAddress.phone || 'N/A'}
Pick-up shop / Delivery method: ${deliveryOrPickUpMethod}
Address: ${shippingAddress.address1 || 'N/A'}, ${shippingAddress.city || ''}, ${shippingAddress.zip || ''}, ${shippingAddress.country || ''}
Delivery/Pick-up date: ${deliveryOrPickUpDate}
Delivery/Pick-up time: ${deliveryOrPickupTime}

Items:
${itemMessages}

Total: ${order.total_price} ${order.currency}
Shopify order link: ${orderLink}
`;

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
