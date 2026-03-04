const Api = require('../models/Api');
const Log = require('../models/Log');

// Add a new API
exports.addApi = async (req, res) => {
  try {
    const { name, url, interval } = req.body;

    if (!name || !url) {
      return res.status(400).json({ error: 'Name and URL are required.' });
    }

    const newApi = new Api({
      name,
      url,
      interval
    });

    await newApi.save();

    res.status(201).json(newApi);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register API' });
  }
};

// Get all registered APIs
exports.getApis = async (req, res) => {
  try {
    const apis = await Api.find().sort({ createdAt: -1 });
    res.status(200).json(apis);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch APIs' });
  }
};

// Get logs for a specific API
exports.getLogs = async (req, res) => {
  try {
    const { apiId } = req.params;

    const logs = await Log.find({ apiId })
      .sort({ timestamp: -1 })
      .limit(50);

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
};

// Get latest status for all APIs
exports.getLatestStatus = async (req, res) => {
  try {
    const logs = await Log.aggregate([
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: "$apiId",
          statusCode: { $first: "$statusCode" },
          responseTime: { $first: "$responseTime" },
          success: { $first: "$success" },
          timestamp: { $first: "$timestamp" }
        }
      }
    ]);

    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};