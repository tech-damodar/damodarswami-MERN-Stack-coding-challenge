import React, { useEffect, useState } from "react";

const Home = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [searchCred, setSearchCred] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(""); // Default to empty for all months
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const perPage = 10; // Set per page here

  // Fetch data from API
  useEffect(() => {
    const apiUrl = `http://localhost:3000/api/transactions?search=${searchCred}&page=${currentPage}&perPage=${perPage}&month=${selectedMonth}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTransactionData(data.transactions || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [searchCred, currentPage, selectedMonth]);

  // Handle search input
  const handleSearchCred = (event) => {
    setSearchCred(event.target.value);
    setCurrentPage(1); // Reset to the first page when search changes
  };

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
        <input
          type="text"
          onChange={handleSearchCred}
          placeholder="Search by title or description"
        />
        <select name="months" onChange={handleMonthChange}>
          <option value="">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Date of Sale</th>
              <th>Sold</th>
            </tr>
          </thead>
          <tbody>
            {transactionData.length > 0 ? (
              transactionData.map((data, index) => (
                <tr key={data._id}>
                  <td>{index + 1 + (currentPage - 1) * perPage}</td>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>${data.price.toFixed(2)}</td>
                  <td>{data.category}</td>
                  <td>{new Date(data.dateOfSale).toLocaleDateString()}</td>
                  <td>{data.sold ? "Yes" : "No"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
