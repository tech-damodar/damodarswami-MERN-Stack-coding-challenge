package com.example.demo.Entity;

import java.util.List;

public class CombinedResponseDTO {
    private List<BarChartDTO> barChart;
    private List<PieChartDTO> pieChart;
    private StatisticsDTO statistics;

    public CombinedResponseDTO(List<BarChartDTO> barChart, List<PieChartDTO> pieChart, StatisticsDTO statistics) {
        this.barChart = barChart;
        this.pieChart = pieChart;
        this.statistics = statistics;
    }

    // Getters and setters
    public List<BarChartDTO> getBarChart() {
        return barChart;
    }

    public void setBarChart(List<BarChartDTO> barChart) {
        this.barChart = barChart;
    }

    public List<PieChartDTO> getPieChart() {
        return pieChart;
    }

    public void setPieChart(List<PieChartDTO> pieChart) {
        this.pieChart = pieChart;
    }

    public StatisticsDTO getStatistics() {
        return statistics;
    }

    public void setStatistics(StatisticsDTO statistics) {
        this.statistics = statistics;
    }
}
