package com.example.demo.dao;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.ProductTransaction;

@Repository
public interface ProductTransactionRepository extends JpaRepository<ProductTransaction, Long>  {
	
	@Query(value = "SELECT * FROM product_transaction t WHERE " +
            "(LOWER(t.title) LIKE :search OR LOWER(t.description) LIKE :search OR CAST(t.price AS CHAR) LIKE :search OR :search IS NULL) " +
            "AND MONTH(t.date_of_sale) = :monthNumber",
    countQuery = "SELECT COUNT(*) FROM product_transaction t WHERE " +
                 "(LOWER(t.title) LIKE :search OR LOWER(t.description) LIKE :search OR CAST(t.price AS CHAR) LIKE :search OR :search IS NULL) " +
                 "AND MONTH(t.date_of_sale) = :monthNumber",
    nativeQuery = true)
Page<ProductTransaction> findBySearchAndMonth(@Param("search") String search,@Param("monthNumber") int monthNumber,
     Pageable pageable);

}
