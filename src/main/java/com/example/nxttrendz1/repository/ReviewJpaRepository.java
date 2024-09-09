package com.example.nxttrendz1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.nxttrendz1.model.Review;
import java.util.List;

@Repository
public interface ReviewJpaRepository extends JpaRepository<Review, Integer> {
    // Custom method to find all reviews for a specific product by productId
    List<Review> findByProduct_ProductId(int productId);
}
