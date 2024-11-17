import React from 'react'
import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const PiecahrtCom = () => {
  let monthNames = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
];
let [month, setMonth] = useState("january");
const [barData, setBarData] = useState([]);


function fetchBarData(selectedmonth) {
    const apiUrl = `http://localhost:8080/api/products/piechart?month=${selectedmonth}`;
    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            setBarData(data);
            console.log(data)
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
        <h1 className="chart-title">Monthly categories and no. of items </h1>
        <p className="chart-description">
            This chart displays the count of products sold in different ranges for
            the selected month.
        </p>

        {/* Chart */}
        <PieChart
  series={[
    {
      data: barData.map((val,index)=>{
        return {id:index, value:val.count,label:val.category}
      }),
      
      // data: [{ id: 0, value: 10, label: 'series A' }],
    },
  ]}
  width={700}
  height={200}
/>
    </div>
);
}

export default PiecahrtCom