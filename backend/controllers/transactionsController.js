const Transaction = require('../models/transaction');

exports.getTransactions = async (req, res) => {
    try {
        const { page = 1, perPage = 10, search = '', month } = req.query;

        // Build MongoDB Query
        const query = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: { $regex: search, $options: 'i' } }
            ];
        }
        if (month) {
            query['dateOfSale.$date'] = {
                $regex: `-${month}-`,
                $options: 'i'
            };
        }

        // Pagination
        const skip = (page - 1) * perPage;
        const transactions = await Transaction.find(query).skip(skip).limit(Number(perPage));
        const totalRecords = await Transaction.countDocuments(query);

        res.json({ totalRecords, page, perPage, transactions });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error });
    }
};


exports.getStatistics = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) return res.status(400).json({ message: 'Month is required' });

        const startDate = new Date(`2021-${month}-01T00:00:00Z`);
        const endDate = new Date(`2021-${parseInt(month) + 1}-01T00:00:00Z`); // Start of next month

        console.log(`Fetching data between ${startDate} and ${endDate}`);

        // Query the database with correct date filtering
        const transactions = await Transaction.find({
            'dateOfSale.$date': { $gte: startDate, $lt: endDate }
        });

        console.log(`Found ${transactions.length} transactions`);

        if (transactions.length === 0) {
            return res.json({
                totalSaleAmount: 0,
                totalSoldItems: 0,
                totalNotSoldItems: 0
            });
        }

        const totalSaleAmount = transactions.reduce((sum, transaction) => sum + transaction.price, 0);
        const totalSoldItems = transactions.filter((transaction) => transaction.sold).length;
        const totalNotSoldItems = transactions.length - totalSoldItems;

        console.log(`Total Sale Amount: ${totalSaleAmount}`);
        console.log(`Total Sold Items: ${totalSoldItems}`);
        console.log(`Total Not Sold Items: ${totalNotSoldItems}`);

        res.json({
            totalSaleAmount,
            totalSoldItems,
            totalNotSoldItems
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ message: 'Error fetching statistics', error });
    }
};


//bar chart
exports.getBarChart = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) return res.status(400).json({ message: 'Month is required' });

        const startDate = new Date(`2021-${month}-01T00:00:00Z`);
        const endDate = new Date(`2021-${parseInt(month) + 1}-01T00:00:00Z`); // Start of next month
        
        console.log(`Fetching data between ${startDate} and ${endDate}`);

        // Query the database with date filtering
        const transactions = await Transaction.find({
            'dateOfSale.$date': { $gte: startDate, $lt: endDate }
        });

        console.log(`Found ${transactions.length} transactions`);

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

        // Iterate through transactions and categorize by price
        transactions.forEach((transaction) => {
            const price = transaction.price;
            console.log(`Processing price: ${price}`);
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

        console.log('Price ranges:', priceRanges);

        res.json(priceRanges);
    } catch (error) {
        console.error('Error fetching bar chart data:', error);
        res.status(500).json({ message: 'Error fetching bar chart data', error });
    }
};


// pie chart 

exports.getPieChart = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) return res.status(400).json({ message: 'Month is required' });

        const regex = new RegExp(`-${month}-`, 'i');
        
        // Query the database with correct date filtering
        const transactions = await Transaction.find({ 'dateOfSale.$date': { $regex: regex } });

        const categoryCounts = {};

        transactions.forEach((transaction) => {
            const category = transaction.category;
            if (!categoryCounts[category]) categoryCounts[category] = 0;
            categoryCounts[category]++;
        });

        res.json(categoryCounts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pie chart data', error });
    }

};


exports.getCombinedData = async (req, res) => {
    try {
        const { month } = req.query;

        const statistics = await this.getStatistics(req, res, true);
        const barChart = await this.getBarChart(req, res, true);
        const pieChart = await this.getPieChart(req, res, true);

        res.json({ statistics, barChart, pieChart });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching combined data', error });
    }
};
