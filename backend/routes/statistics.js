const express = require('express');
const router = express.Router();
const { getStatistics } = require('../controllers/transactionsController');

router.get('/api/statistics', getStatistics);

module.exports = router;
