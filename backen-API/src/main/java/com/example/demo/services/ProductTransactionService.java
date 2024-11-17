package com.example.demo.services;

import com.example.demo.Entity.BarChartDTO;
import com.example.demo.Entity.ProductTransaction;
import com.example.demo.Entity.StatisticsDTO;
import com.example.demo.dao.ProductTransactionRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service

public class ProductTransactionService {

    private final String API_URL = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

    @Autowired
    private ProductTransactionRepository repository;

    public void initializeDatabase() throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();

        // Fetch data from the third-party API
        String jsonResponse = restTemplate.getForObject(API_URL, String.class);

        // Map JSON data to a list of ProductTransaction
        List<ProductTransaction> transactions = objectMapper.readValue(jsonResponse, 
            new TypeReference<List<ProductTransaction>>() {});
        
        for (ProductTransaction transaction : transactions) {
            System.out.println(transaction);  // Ensure to override `toString` method in `ProductTransaction`
        }
        
        // Save to database
        repository.saveAll(transactions);
    }
    
    //get all statistics details
    
    public StatisticsDTO getStatistics(String month) {
        // Trim and validate the input month
        if (month == null || month.trim().isEmpty()) {
            throw new IllegalArgumentException("Month parameter cannot be null or empty.");
        }
        month = month.trim();

        List<ProductTransaction> allTransactions = repository.findAll();
        SimpleDateFormat monthFormatter = new SimpleDateFormat("MMMM");

        // Initialize statistics
        double totalSales = 0.0;
        int totalSoldItems = 0;
        int totalNotSoldItems = 0;

        // Filter and calculate statistics
        for (ProductTransaction transaction : allTransactions) {
            if (transaction.getDateOfSale() != null) {
                String transactionMonth = monthFormatter.format(transaction.getDateOfSale());
                if (transactionMonth.equalsIgnoreCase(month)) {
                    if (transaction.getPrice() != null && transaction.getPrice() > 0) {
                        totalSales += transaction.getPrice();
                        totalSoldItems++;
                    } else {
                        totalNotSoldItems++;
                    }
                }
            }
        }

        // Return statistics as DTO
        return new StatisticsDTO(totalSales, totalSoldItems, totalNotSoldItems);
    }
    
    // get data for barchart 
    public List<BarChartDTO> getBarChart(String month) {
        List<ProductTransaction> allTransactions = repository.findAll();
        SimpleDateFormat monthFormatter = new SimpleDateFormat("MMMM");

        // Filter by month
        List<ProductTransaction> filteredByMonth = allTransactions.stream()
                .filter(transaction -> transaction.getDateOfSale() != null &&
                        monthFormatter.format(transaction.getDateOfSale()).equalsIgnoreCase(month.trim()))
                .collect(Collectors.toList());

        // Initialize price range counts
        int[] priceRangeCounts = new int[10]; // 0-9 for 10 ranges

        // Categorize by price ranges
        for (ProductTransaction transaction : filteredByMonth) {
            if (transaction.getPrice() != null) {
                double price = transaction.getPrice();
                if (price <= 100) priceRangeCounts[0]++;
                else if (price <= 200) priceRangeCounts[1]++;
                else if (price <= 300) priceRangeCounts[2]++;
                else if (price <= 400) priceRangeCounts[3]++;
                else if (price <= 500) priceRangeCounts[4]++;
                else if (price <= 600) priceRangeCounts[5]++;
                else if (price <= 700) priceRangeCounts[6]++;
                else if (price <= 800) priceRangeCounts[7]++;
                else if (price <= 900) priceRangeCounts[8]++;
                else priceRangeCounts[9]++; // 901 and above
            }
        }

        // Map to BarChartDTO list
        List<BarChartDTO> barChartData = new ArrayList<>();
        barChartData.add(new BarChartDTO("0-100", priceRangeCounts[0]));
        barChartData.add(new BarChartDTO("101-200", priceRangeCounts[1]));
        barChartData.add(new BarChartDTO("201-300", priceRangeCounts[2]));
        barChartData.add(new BarChartDTO("301-400", priceRangeCounts[3]));
        barChartData.add(new BarChartDTO("401-500", priceRangeCounts[4]));
        barChartData.add(new BarChartDTO("501-600", priceRangeCounts[5]));
        barChartData.add(new BarChartDTO("601-700", priceRangeCounts[6]));
        barChartData.add(new BarChartDTO("701-800", priceRangeCounts[7]));
        barChartData.add(new BarChartDTO("801-900", priceRangeCounts[8]));
        barChartData.add(new BarChartDTO("901-above", priceRangeCounts[9]));

        return barChartData;
    }


}
