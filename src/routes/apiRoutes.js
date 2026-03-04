const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController');

router.post('/add', apiController.addApi);
router.get('/list', apiController.getApis);
router.get('/logs/:apiId', apiController.getLogs);
router.get('/status', apiController.getLatestStatus);

module.exports = router;