import React from 'react'
import { useState,useEffect } from 'react';
const Statistics = () => {
    let monthNames = [
        "january", "february", "march", "april", "may", "june", 
        "july", "august", "september", "october", "november", "december"
    ];
    let[month,setMonth] = useState("january");
    const [statisticData, setstatisticsData] = useState([]);
    

    function fetchBarData(selectedmonth){
        const apiUrl = `http://localhost:8080/api/products/statistics?month=${selectedmonth}`;
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                setstatisticsData(data);
            })
            .catch((e) => {
                console.error("Error fetching bar chart data:", e);
            });

            

        }
        useEffect(() => {
            fetchBarData(month); // Fetch for the current selected month
            console.log("barData updated:");
        },[month]);

    const handleMonthChange = (event) => {
        const selectedValue = event.target.value.toLowerCase();
        setMonth(selectedValue);
        
        
    };

    return (
        <div className='sta-main'>
        <h1 className='st-text'>Tranction Statistic </h1>
        <div className='statistic'>
             
            <div className='card-s'>
                <p>Total Sale<span>{statisticData.totalSales}</span></p>
                <p>Toatal sold item <span>{statisticData.totalSoldItems}</span></p>
                <p>Total not sold item<span>{statisticData.totalNotSoldItems}</span></p>
            </div>
            <div className="search">
                <select id="months" onChange={handleMonthChange}>
                    {monthNames.map((month) => (
                        <option key={month} value={month}>{month.charAt(0).toUpperCase() + month.slice(1)}</option>
                    ))}
                </select>
            </div>
        </div>
        </div>
    );
}

export default Statistics