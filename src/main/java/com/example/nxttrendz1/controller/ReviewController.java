package com.example.nxttrendz1.controller;

import com.example.nxttrendz1.model.Review;
import com.example.nxttrendz1.model.Product;
import com.example.nxttrendz1.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // API 6: GET /products/reviews
    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    // API 7: POST /products/reviews
    @PostMapping
    public Review postReview(@RequestBody Review review) {
        return reviewService.postReview(review);
    }

    // API 8: GET /products/reviews/{reviewId}
    @GetMapping("/{reviewId}")
    public ResponseEntity<Review> getReviewById(@PathVariable int reviewId) {
        try {
            Review review = reviewService.getReviewById(reviewId)
                    .orElseThrow(() -> new RuntimeException("Review not found"));
            return ResponseEntity.ok(review);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 NOT FOUND
        }
    }

    // API 9: PUT /products/reviews/{reviewId}
    @PutMapping("/{reviewId}")
    public ResponseEntity<Review> putReview(@PathVariable int reviewId, @RequestBody Review review) {
        try {
            Review updatedReview = reviewService.putReview(reviewId, review)
                    .orElseThrow(() -> new RuntimeException("Review not found"));
            return ResponseEntity.ok(updatedReview);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 NOT FOUND
        }
    }

    // API 10: DELETE /products/reviews/{reviewId}
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable int reviewId) {
        try {
            reviewService.deleteReview(reviewId);
            return ResponseEntity.noContent().build(); // 204 NO CONTENT
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 NOT FOUND
        }
    }

    // API 11: GET /reviews/{reviewId}/product
    @GetMapping("/reviews/{reviewId}/product")
    public ResponseEntity<Product> getProductByReviewId(@PathVariable int reviewId) {
        try {
            Product product = reviewService.getProductByReviewId(reviewId)
                    .orElseThrow(() -> new RuntimeException("Product not found for the review"));
            return ResponseEntity.ok(product);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 NOT FOUND
        }
    }
}
