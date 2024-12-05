const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction')
// const { getTransactions } = require('../controllers/transactionsController');


// Define the route to get transactions with search and pagination
router.get('/api/transactions', async (req, res) => {
    try {
        const { search = '', page = 1, perPage = 10, month } = req.query;

        // Ensure the month is valid (if provided)
        if (month && (month < 1 || month > 12)) {
            return res.status(400).json({ message: 'Invalid month. It should be between 1 and 12.' });
        }

        // Prepare the search query
        const searchQuery = search
            ? {
                  $or: [
                      { title: { $regex: search, $options: 'i' } },
                      { description: { $regex: search, $options: 'i' } },
                  ],
              }
            : {};

        // Add the month filter if provided
        const monthFilter = month ? { month: parseInt(month, 10) } : {};

        // Aggregate the query
        const filterPipeline = [
            {
                $project: {
                    title: 1,
                    description: 1,
                    price: 1,
                    dateOfSale: 1,
                    sold: 1,
                    category: 1,
                    month: { $month: "$dateOfSale" }, // Add a month field from dateOfSale
                },
            },
            {
                // Apply the month filter
                $match: monthFilter,
            },
            {
                // Apply the search filter
                $match: searchQuery,
            },
        ];

        // Total count of matching transactions
        const totalCountPipeline = [...filterPipeline, { $count: "total" }];
        const totalCountResult = await Transaction.aggregate(totalCountPipeline);
        const totalItems = totalCountResult[0]?.total || 0;

        // Paginated results
        const paginatedPipeline = [
            ...filterPipeline,
            { $skip: (page - 1) * perPage },
            { $limit: parseInt(perPage, 10) },
        ];
        const transactions = await Transaction.aggregate(paginatedPipeline);

        // Calculate total pages
        const totalPages = Math.ceil(totalItems / perPage);

        res.json({
            transactions,
            currentPage: parseInt(page, 10),
            perPage: parseInt(perPage, 10),
            totalPages,
            totalItems,
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Error fetching transactions', error });
    }
});



router.get('/api/bar-chart', async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({ message: 'Month is required' });
        }

        // Ensure the month is a valid number between 1 and 12
        if (month < 1 || month > 12) {
            return res.status(400).json({ message: 'Invalid month. It should be between 1 and 12.' });
        }

        // Aggregation pipeline to extract the month from dateOfSale and filter based on it
        const transactions = await Transaction.aggregate([
            {
                // Extract the month from the dateOfSale field
                $project: {
                    title: 1,
                    description: 1,
                    price: 1,
                    dateOfSale: 1,
                    month: { $month: "$dateOfSale" }  // Create a new field `month` from `dateOfSale`
                }
            },
            {
                // Filter the transactions to only include those in the requested month
                $match: { month: parseInt(month) }
            }
        ]);

        // Check if there are no transactions for that month
        if (transactions.length === 0) {
            return res.status(404).json({ message: `No transactions found for month ${month}` });
        }

        // Initialize price ranges
        const priceRanges = {
            '0-100': 0,
            '101-200': 0,
            '201-300': 0,
            '301-400': 0,
            '401-500': 0,
            '501-600': 0,
            '601-700': 0,
            '701-800': 0,
            '801-900': 0,
            '901-above': 0
        };

        // Categorize transactions by price ranges
        transactions.forEach((transaction) => {
            const price = transaction.price;
            if (price <= 100) priceRanges['0-100']++;
            else if (price <= 200) priceRanges['101-200']++;
            else if (price <= 300) priceRanges['201-300']++;
            else if (price <= 400) priceRanges['301-400']++;
            else if (price <= 500) priceRanges['401-500']++;
            else if (price <= 600) priceRanges['501-600']++;
            else if (price <= 700) priceRanges['601-700']++;
            else if (price <= 800) priceRanges['701-800']++;
            else if (price <= 900) priceRanges['801-900']++;
            else priceRanges['901-above']++;
        });

        // Return the final response with the price ranges
        res.json(priceRanges);

    } catch (error) {
        console.error('Error fetching bar chart data:', error);
        res.status(500).json({ message: 'Error fetching bar chart data', error });
    }
});

// Define the route to get pie chart data based on the month
router.get('/api/pie-chart', async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({ message: 'Month is required' });
        }

        // Ensure the month is valid
        if (month < 1 || month > 12) {
            return res.status(400).json({ message: 'Invalid month. It should be between 1 and 12.' });
        }

        // Aggregation pipeline to extract the month from dateOfSale and filter based on it
        const transactions = await Transaction.aggregate([
            {
                $project: {
                    category: 1,
                    dateOfSale: 1,
                    month: { $month: "$dateOfSale" }
                }
            },
            {
                $match: { month: parseInt(month) }
            },
            {
                // Group by category to count the number of items in each category
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Check if there are no transactions for that month
        if (transactions.length === 0) {
            return res.status(404).json({ message: `No transactions found for month ${month}` });
        }

        // Format the response into a pie chart structure
        const result = transactions.map((transaction) => ({
            category: transaction._id,
            count: transaction.count
        }));

        // Return the final pie chart data
        res.json(result);

    } catch (error) {
        console.error('Error fetching pie chart data:', error);
        res.status(500).json({ message: 'Error fetching pie chart data', error });
    }
});

// Define the route to get statistics data based on the month
router.get('/api/statistics', async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({ message: 'Month is required' });
        }

        // Ensure the month is valid
        if (month < 1 || month > 12) {
            return res.status(400).json({ message: 'Invalid month. It should be between 1 and 12.' });
        }

        // Aggregation pipeline to extract the month and filter based on it
        const transactions = await Transaction.aggregate([
            {
                $project: {
                    sold: 1,
                    price: 1,
                    dateOfSale: 1,
                    month: { $month: "$dateOfSale" }
                }
            },
            {
                $match: { month: parseInt(month) }
            }
        ]);

        // Calculate total sale amount, total sold items, and total not sold items
        const stats = {
            totalSaleAmount: 0,
            totalSoldItems: 0,
            totalNotSoldItems: 0
        };

        transactions.forEach((transaction) => {
            if (transaction.sold) {
                stats.totalSoldItems++;
                stats.totalSaleAmount += transaction.price;
            } else {
                stats.totalNotSoldItems++;
            }
        });

        // Return the final statistics data
        res.json(stats);

    } catch (error) {
        console.error('Error fetching statistics data:', error);
        res.status(500).json({ message: 'Error fetching statistics data', error });
    }
});



module.exports = router;
