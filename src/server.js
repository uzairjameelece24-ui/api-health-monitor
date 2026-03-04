require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const startCron = require('./services/cron');

connectDB();
startCron();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 API Health Monitor running on port ${PORT}`);
});