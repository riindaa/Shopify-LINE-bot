# Shopify-LINE Manager 🛍️📲

A Node.js backend that listens to Shopify webhooks and sends real-time order notifications to a LINE user via the LINE Messaging API.

---

## 🚀 Features

- ✅ Receive Shopify **order creation webhooks**
- ✅ Send order details to LINE using **LINE Notify / Messaging API**
- ✅ Modular structure using **Express.js**, **controllers**, **routes**, and **services**
- ✅ Written with **ES6 module syntax**
- ✅ Uses `dotenv` for managing environment variables

---

## 🛠️ Installation

1. **Clone the repo:**

```bash
git clone https://github.com/your-username/shopify-line-manager.git
cd shopify-line-manager
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure your environment variables:**

Create a `.env` file from the provided example:

```bash
cp .env.example .env
```

Then fill in the required values in `.env`.

📦 Environment Variables (`.env`)

```env
PORT=4000
LINE_USER_ID=YOUR_LINE_USER_ID
LINE_CHANNEL_ACCESS_TOKEN=YOUR_LINE_CHANNEL_ACCESS_TOKEN
```

- `PORT`: Port to run the server (default: 4000)
- `LINE_USER_ID`: LINE user ID to receive messages
- `LINE_CHANNEL_ACCESS_TOKEN`: Access token from the LINE Developer Console

---

## ▶️ Running the Server

```bash
npm run dev
```

Visit: http://localhost:4000



