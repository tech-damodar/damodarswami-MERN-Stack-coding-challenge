package com.example.demo.Entity;

import jakarta.persistence.*;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="product")
@JsonIgnoreProperties(ignoreUnknown = true) 
public class ProductTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //category, date_of_sale, description, price, title
    @Column(name="title")
    private String title;
    @Column(name="description",length=1000)
    private String description;
    @Column(name="price")
    private Double price;
    
    @Temporal(TemporalType.DATE)
    @Column(name="dateOfSale")
    private Date dateOfSale;
    @Column(name="category")
    private String category;  // Add this field to match the JSON data

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Date getDateOfSale() {
        return dateOfSale;
    }

    public void setDateOfSale(Date dateOfSale) {
        this.dateOfSale = dateOfSale;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public ProductTransaction(String title, String description, Double price, Date dateOfSale, String category) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.dateOfSale = dateOfSale;
        this.category = category;
    }

    public ProductTransaction() {
    }

    @Override
    public String toString() {
        return "ProductTransaction{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", dateOfSale=" + dateOfSale +
                ", category='" + category + '\'' +
                '}';
    }
}
