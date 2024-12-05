const express = require('express');
const router = express.Router();
const { initializeDatabase } = require('../controllers/initializeController');

router.get('/api/initialize', initializeDatabase);

module.exports = router;
