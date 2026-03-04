const cron = require('node-cron');
const Api = require('../models/Api');
const pingApi = require('./checker'); // Import the ping function correctly

const startCronJob = () => {
  // '* * * * *' → runs every minute
  cron.schedule('* * * * *', async () => {
    console.log('⏰ [CRON] Running health checks...');

    try {
      // 1️⃣ Fetch all registered APIs
      const apis = await Api.find();

      if (apis.length === 0) {
        console.log('ℹ️ No APIs registered.');
        return;
      }

      // 2️⃣ Check interval logic
      const currentMinute = new Date().getMinutes();

      const apisToRun = apis.filter(api =>
        currentMinute % api.interval === 0
      );

      if (apisToRun.length === 0) return;

      // 3️⃣ Run checks safely (avoid crashing)
      const checkPromises = apisToRun.map(api => pingApi(api));

      await Promise.allSettled(checkPromises);

      console.log(`✅ Completed checks for ${apisToRun.length} APIs.`);

    } catch (error) {
      console.error('❌ Cron error:', error.message);
    }
  });
};

module.exports = startCronJob;