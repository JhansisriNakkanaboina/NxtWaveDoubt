package com.example.nxttrendz1.service;

import com.example.nxttrendz1.model.Product;
import com.example.nxttrendz1.model.Review;
import com.example.nxttrendz1.repository.ProductJpaRepository;
import com.example.nxttrendz1.repository.ReviewJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewJpaRepository reviewJpaRepository;

    @Autowired
    private ProductJpaRepository productJpaRepository;

    public List<Review> getAllReviews() {
        return reviewJpaRepository.findAll();
    }

    public Optional<Review> getReviewById(int reviewId) {
        return reviewJpaRepository.findById(reviewId);
    }

    public Review postReview(Review review) {
        // Validate if the product associated with the review exists
        Optional<Product> productOptional = productJpaRepository.findById(review.getProduct().getProductId());
        
        if (productOptional.isPresent()) {
            // Set the product to the review
            review.setProduct(productOptional.get());
            
            // Save and return the review
            return reviewJpaRepository.save(review);
        } else {
            throw new RuntimeException("Product not found with id: " + review.getProduct().getProductId());
        }
    }

    public Optional<Review> putReview(int reviewId, Review review) {
        return reviewJpaRepository.findById(reviewId).map(existingReview -> {
            existingReview.setReviewContent(review.getReviewContent());
            existingReview.setRating(review.getRating());
            return reviewJpaRepository.save(existingReview);
        });
    }

    public void deleteReview(int reviewId) {
        reviewJpaRepository.deleteById(reviewId);
    }

    public Optional<Product> getProductByReviewId(int reviewId) {
        return reviewJpaRepository.findById(reviewId).map(Review::getProduct);
    }
}