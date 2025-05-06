// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// require('dotenv').config();

// const authRoutes = require('./routes/authRoutes');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use('/api', authRoutes);

// app.listen(PORT, () => {
//   console.log(`Express server running on port ${PORT}`);
// });
// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');  // Import analytics routes
const interpretationRoutes = require('./routes/interpretationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', authRoutes);  // Authentication routes
app.use('/api/analytics', analyticsRoutes);  // Analytics route for fetching device data
app.use('/api', interpretationRoutes);

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
