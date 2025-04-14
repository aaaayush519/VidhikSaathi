package com.VidhikSaathi.VidhikSaathi_BE.services;

import com.VidhikSaathi.VidhikSaathi_BE.dtos.ReviewDto;
import com.VidhikSaathi.VidhikSaathi_BE.entity.Review;
import com.VidhikSaathi.VidhikSaathi_BE.entity.ServiceRequest;
import com.VidhikSaathi.VidhikSaathi_BE.repository.ReviewRepository;
import com.VidhikSaathi.VidhikSaathi_BE.repository.ServiceRequestRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private ServiceRequestRepository serviceRequestRepository;

    public ReviewDto addReview(ReviewDto reviewDto) {
        Optional<ServiceRequest> serviceRequest = serviceRequestRepository.findById(reviewDto.getServiceRequestId());
        if(serviceRequest.isEmpty()){
            return null;
        }
        Review review = new Review();
        review.setServiceRequest(serviceRequest.get());
        review.setComment(reviewDto.getComment());
        review.setRating(reviewDto.getRating());
        review.setCreatedAt(LocalDateTime.now());
        reviewRepository.save(review);
        BeanUtils.copyProperties(review, reviewDto);
        return reviewDto;
    }

    public List<ReviewDto> getReviewsByProviderId(Long id) {
        List<Review> reviews = reviewRepository.findByServiceRequest_Provider_Id(id);
        if(reviews == null){
            return null;
        }
        List<ReviewDto> reviewDtos = new ArrayList<>();
        for(Review review : reviews){
            ReviewDto reviewDto = new ReviewDto();
            BeanUtils.copyProperties(review,reviewDto);
            reviewDto.setServiceRequestId(review.getServiceRequest().getId());
            reviewDtos.add(reviewDto);
        }
        return reviewDtos;
    }
}
