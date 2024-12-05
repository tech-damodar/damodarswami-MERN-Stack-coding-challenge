const express = require('express');
const router = express.Router();
const { getBarChart } = require('../controllers/transactionsController');

router.get('/api/bar-chart', getBarChart);

module.exports = router;
