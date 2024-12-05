const express = require('express');
const router = express.Router();
const { getPieChart } = require('../controllers/transactionsController');

router.get('/api/pie-chart', getPieChart);

module.exports = router;
