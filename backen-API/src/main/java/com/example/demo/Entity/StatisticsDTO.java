package com.example.demo.Entity;

public class StatisticsDTO {
    private double totalSales;
    private int totalSoldItems;
    private int totalNotSoldItems;

    public StatisticsDTO(double totalSales, int totalSoldItems, int totalNotSoldItems) {
        this.totalSales = totalSales;
        this.totalSoldItems = totalSoldItems;
        this.totalNotSoldItems = totalNotSoldItems;
    }

	public double getTotalSales() {
		return totalSales;
	}

	public void setTotalSales(double totalSales) {
		this.totalSales = totalSales;
	}

	public int getTotalSoldItems() {
		return totalSoldItems;
	}

	public void setTotalSoldItems(int totalSoldItems) {
		this.totalSoldItems = totalSoldItems;
	}

	public int getTotalNotSoldItems() {
		return totalNotSoldItems;
	}

	public void setTotalNotSoldItems(int totalNotSoldItems) {
		this.totalNotSoldItems = totalNotSoldItems;
	}

	public StatisticsDTO() {
	
	}
	

    // Getters and Setters
    
}