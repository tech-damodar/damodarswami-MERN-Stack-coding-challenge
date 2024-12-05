const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const initializeRoutes = require('./routes/initialize');
const transactionRoutes = require('./routes/transactions');
const statisticsRoutes = require('./routes/statistics');
const barChartRoutes = require('./routes/barChart');
const pieChartRoutes = require('./routes/pieChart');

app.use(cors())
app.use(bodyParser.json());
app.use(initializeRoutes);
app.use(transactionRoutes);
app.use(statisticsRoutes);
app.use(barChartRoutes);
app.use(pieChartRoutes);

mongoose.connect('mongodb://localhost:27017/backendTask', { useNewUrlParser: true, useUnifiedTopology: true });

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
