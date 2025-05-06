// controllers/analyticsController.js

const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

// File path to the CSV file (assuming it's stored inside the data folder)
const csvFilePath = path.join(__dirname, '../data/devices.csv');

// Function to read and parse CSV data
const parseCSV = () => {
    return new Promise((resolve, reject) => {
        const devices = [];
        
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => devices.push(row))
            .on('end', () => resolve(devices))
            .on('error', (err) => reject(err));
    });
};

// Controller to fetch analytics based on device ID
const getDeviceAnalytics = async (req, res) => {
    const deviceId = req.params.deviceId; // Get the deviceId from the URL parameter

    try {
        const devices = await parseCSV();
        // Filter devices based on the provided device ID
        const deviceData = devices.filter(device => device['device id'] === deviceId);
        
        if (deviceData.length > 0) {
            // Send the filtered data to the frontend
            res.json(deviceData);
        } else {
            res.status(404).json({ message: 'Device not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error reading CSV file', error });
    }
};

module.exports = { getDeviceAnalytics };
