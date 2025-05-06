// routes/analyticsRoutes.js

const express = require('express');
const router = express.Router();
const { getDeviceAnalytics } = require('../controllers/analyticsController');

// Define the route for fetching analytics data by device ID
router.get('/:deviceId', getDeviceAnalytics);

module.exports = router;
