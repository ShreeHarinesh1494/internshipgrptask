const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const moment = require('moment');

const csvFilePath = path.join(__dirname, '../data/devices.csv');

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

const getDeviceInterpretation = async (req, res) => {
    const deviceId = req.params.deviceId;

    try {
        const devices = await parseCSV();
        const deviceData = devices.filter(device => device['device id'] === deviceId);

        if (deviceData.length === 0) {
            return res.status(404).json({ message: 'Device not found' });
        }

        const values = deviceData.map(d => parseFloat(d.value));
        const timestamps = deviceData.map(d => moment(d.timestamp, 'DD-MM-YYYY HH:mm'));
        const latestIndex = timestamps.reduce((latestIdx, current, idx, arr) =>
            current.isAfter(arr[latestIdx]) ? idx : latestIdx, 0);

        const interpretation = {
            deviceId,
            deviceName: deviceData[0]['device name'],
            minValue: Math.min(...values),
            maxValue: Math.max(...values),
            averageValue: (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2),
            latestValue: values[latestIndex],
            latestTimestamp: timestamps[latestIndex].format('DD-MM-YYYY HH:mm'),
            totalEntries: deviceData.length
        };

        res.json(interpretation);
    } catch (error) {
        res.status(500).json({ message: 'Error processing interpretation', error });
    }
};

module.exports = { getDeviceInterpretation };
