require("dotenv").config();
const express = require("express");
const webhookRoutes = require("./routes/webhookRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/", webhookRoutes);

app.use((req, res) => {
  res.status(404).send('Error');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});