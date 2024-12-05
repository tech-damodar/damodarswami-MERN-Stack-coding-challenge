import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const TransactionsBar = () => {
    const monthNames = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ];

    const [month, setMonth] = useState(1); // Default to January
    const [barData, setBarData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch Bar Chart Data
    const fetchBarData = async (selectedMonth) => {
        setLoading(true);
        setError(null);
        const apiUrl = `http://localhost:3000/api/bar-chart?month=${selectedMonth}`;
    
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Failed to fetch data");
    
            const data = await response.json();
    
            // Transform the object into an array of objects
            const transformedData = Object.entries(data).map(([range, count]) => ({
                range,
                count,
            }));
    
            setBarData(transformedData); // Update barData with transformed data
        } catch (e) {
            setError("Error fetching bar chart data. Please try again later.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
    

    // Effect to fetch data whenever the month changes
    useEffect(() => {
        fetchBarData(month);
    }, [month]);

    // Handle Month Dropdown Change
    const handleMonthChange = (event) => {
        const selectedValue = event.target.value.toLowerCase();
        const monthNumber = monthNames.indexOf(selectedValue) + 1; // Convert to month number (1-12)
        setMonth(monthNumber);
    };

    return (
        <div className="containerbar">
            {/* Month Selection Dropdown */}
            <div className="month-selector">
                <select id="months" onChange={handleMonthChange} defaultValue={monthNames[month - 1]}>
                    {monthNames.map((month, index) => (
                        <option key={month} value={month}>
                            {month.charAt(0).toUpperCase() + month.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Chart Title */}
            <h1 className="chart-title">Monthly Sales Data</h1>
            <p className="chart-description">
                This chart displays the count of products sold in different ranges for the selected month.
            </p>

            {/* Loading and Error States */}
            {loading && <p>Loading chart data...</p>}
            {error && <p className="error-message">{error}</p>}

            {/* Chart */}
            {barData.length > 0 ? (
                <BarChart
                    dataset={barData}
                    xAxis={[{ scaleType: "band", dataKey: "range", label: "Sales Range" }]}
                    series={[{ dataKey: "count", label: "Count of Products Sold" }]}
                    width={600}
                    height={400}
                />
            ) : (
                !loading && !error && <p>No data available for the selected month.</p>
            )}
        </div>
    );
};

export default TransactionsBar;
