import axios from 'axios';

const LINE_API = 'https://api.line.me/v2/bot/message/push';

export const sendMessage = async (text) => {
  try {
    await axios.post(
      LINE_API,
      {
        to: process.env.LINE_USER_ID,
        messages: [{ type: 'text', text }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('LINE API error:', error.message);
  }
};
