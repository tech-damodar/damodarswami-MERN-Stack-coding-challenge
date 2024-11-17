import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Home = () => {
  let monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [transactionData, setTransactionData] = useState([]);
  const [searchCred, setSearchCred] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('march');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Fetch data from API
  useEffect(() => {
    const apiUrl = `http://localhost:8080/api/products/all?month=${selectedMonth.toLowerCase()}&search=${searchCred}&page=${currentPage}&perPage=${perPage}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTransactionData(data.content); // Set table data
        setTotalPages(data.totalPages); // Set total pages for pagination
      })
      .catch((e) => {
        console.error(e);
      });
  }, [selectedMonth, searchCred, currentPage, perPage]);

  // Handle search input
  function handleSearchCred(event) {
    setSearchCred(event.target.value);
    setCurrentPage(1); // Reset to the first page when search changes
  }

  // Handle month selection
  const handleMonthChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedMonth(selectedValue);
    setCurrentPage(1); // Reset to the first page when the month changes
  };

  // Handle pagination navigation
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <h2 className="title">Transaction Data</h2>
      <div className="search">
        <div className="searchBox">
          <input
            type="text"
            onChange={handleSearchCred}
            placeholder="Search..."
          />
        </div>
        <select name="months" id="months" onChange={handleMonthChange}>
          {monthNames.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr className="throw">
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Date of Sale</th>
            </tr>
          </thead>
          <tbody>
            {transactionData.length > 0 ? (
              transactionData.map((data, index) => (
                <tr key={data.id}>
                  <td>{index + 1 + (currentPage - 1) * perPage}</td>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>{data.price}</td>
                  <td>{data.category}</td>
                  <td>{data.dateOfSale}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
