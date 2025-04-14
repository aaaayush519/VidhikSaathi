package com.VidhikSaathi.VidhikSaathi_BE.controller;

import com.VidhikSaathi.VidhikSaathi_BE.dtos.ReviewDto;
import com.VidhikSaathi.VidhikSaathi_BE.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewDto> addReview(@RequestBody ReviewDto reviewDto){
        ReviewDto response = reviewService.addReview(reviewDto);
        if(response == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<ReviewDto>> getReviewsByProviderId(@PathVariable Long id){
        List<ReviewDto> response = reviewService.getReviewsByProviderId(id);
        if(response == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

}
