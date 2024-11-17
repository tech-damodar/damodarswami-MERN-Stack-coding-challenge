package com.example.demo.Entity;

public class PieChartDTO {
    private String category;
    private long count;

    public PieChartDTO(String category, long count) {
        this.category = category;
        this.count = count;
    }

    // Getters and setters
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}
