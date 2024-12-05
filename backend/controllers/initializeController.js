const axios = require('axios');
const Transaction = require('../models/transaction');

exports.initializeDatabase = async (req, res) => {
    try {
        const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await Transaction.deleteMany(); // Clear existing data
        await Transaction.insertMany(data); // Seed new data
        res.json({ message: 'Database initialized with seed data', totalRecords: data.length });
    } catch (error) {
        res.status(500).json({ message: 'Failed to initialize database', error });
    }
};
