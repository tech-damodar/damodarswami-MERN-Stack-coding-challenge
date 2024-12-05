const axios = require('axios');
const Transaction = require('../models/transaction');

const seedDatabase = async () => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        // Clear existing records
        await Transaction.deleteMany();

        // Seed new records
        await Transaction.insertMany(transactions);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error.message);
    }
};

module.exports = seedDatabase;
