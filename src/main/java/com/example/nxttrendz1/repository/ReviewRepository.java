package com.example.nxttrendz1.repository;

import com.example.nxttrendz1.model.Review;
import java.util.List;

public interface ReviewRepository {
    List<Review> getAllReviews();
    Review getReview(int reviewId);
    Review postReview(Review review);
    Review putReview(int reviewId, Review review);
    void deleteReview(int reviewId);
}
