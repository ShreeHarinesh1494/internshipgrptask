const express = require('express');
const router = express.Router();
const { getDeviceInterpretation } = require('../controllers/interpretationController');

router.get('/deviceInterpretation/:deviceId', getDeviceInterpretation);

module.exports = router;
