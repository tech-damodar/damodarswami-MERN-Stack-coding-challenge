import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const TransactionsBar = () => {
    let monthNames = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ];
    let [month, setMonth] = useState("january");
    const [barData, setBarData] = useState([]);


    function fetchBarData(selectedmonth) {
        const apiUrl = `http://localhost:8080/api/products/barchart?month=${selectedmonth}`;
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                setBarData(data);
            })
            .catch((e) => {
                console.error("Error fetching bar chart data:", e);
            });



    }
    useEffect(() => {
        fetchBarData(month); // Fetch for the current selected month
        console.log("barData updated:");
    }, [month]);

    const handleMonthChange = (event) => {
        const selectedValue = event.target.value.toLowerCase();
        setMonth(selectedValue);


    };

    return (
        <div className="containerbar">
            {/* Month Selection Dropdown */}
            <div className="month-selector">
                <select id="months" onChange={handleMonthChange}>
                    {monthNames.map((month) => (
                        <option key={month} value={month}>
                            {month.charAt(0).toUpperCase() + month.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Chart Title */}
            <h1 className="chart-title">Monthly Sales Data</h1>
            <p className="chart-description">
                This chart displays the count of products sold in different ranges for
                the selected month.
            </p>

            {/* Chart */}
            <BarChart
                dataset={barData}
                xAxis={[{ scaleType: "band", dataKey: "range", label: "Sales Range" }]}
                series={[{ dataKey: "count", label: "Count of Products Sold" }]}
                width={600}
                height={400}
            />
        </div>
    );
};

export default TransactionsBar;
