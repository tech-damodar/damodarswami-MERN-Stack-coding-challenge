package com.example.demo.Entity;

public class BarChartDTO {
    private String range;
    private int count;

    public BarChartDTO(String range, int count) {
        this.range = range;
        this.count = count;
    }

    // Getters and setters
    public String getRange() {
        return range;
    }

    public void setRange(String range) {
        this.range = range;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}

