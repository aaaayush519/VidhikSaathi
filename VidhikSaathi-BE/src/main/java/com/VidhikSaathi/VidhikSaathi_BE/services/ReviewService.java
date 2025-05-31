package com.VidhikSaathi.VidhikSaathi_BE.services;

import com.VidhikSaathi.VidhikSaathi_BE.dtos.ReviewDto;
import com.VidhikSaathi.VidhikSaathi_BE.entity.ProviderProfile;
import com.VidhikSaathi.VidhikSaathi_BE.entity.Review;
import com.VidhikSaathi.VidhikSaathi_BE.entity.ServiceRequest;
import com.VidhikSaathi.VidhikSaathi_BE.repository.ProviderProfileRepository;
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
    @Autowired
    private ProviderProfileRepository providerProfileRepository;

    public ReviewDto addReview(ReviewDto reviewDto) {
        Optional<ServiceRequest> serviceRequestOpt = serviceRequestRepository.findById(reviewDto.getServiceRequestId());

        if (serviceRequestOpt.isEmpty()) {
            return null;
        }

        ServiceRequest serviceRequest = serviceRequestOpt.get();

        Review review = new Review();
        review.setServiceRequest(serviceRequest);
        review.setComment(reviewDto.getComment());
        review.setRating(reviewDto.getRating());
        review.setCreatedAt(LocalDateTime.now());

        reviewRepository.save(review);
        serviceRequest.setStatus("FINISHED");
        BeanUtils.copyProperties(review, reviewDto);

        Double averageRating = reviewRepository.averageRatingByProviderUsername(serviceRequest.getProviderUsername());

        ProviderProfile providerProfile = providerProfileRepository.findByUserId(serviceRequest.getProvider().getId())
                .orElseThrow(() -> new RuntimeException("Provider profile not found"));

        providerProfile.setRating(averageRating != null ? averageRating : 0.0);
        providerProfileRepository.save(providerProfile); // <-- Don't forget to save the update

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
