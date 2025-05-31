package com.VidhikSaathi.VidhikSaathi_BE.repository;

import com.VidhikSaathi.VidhikSaathi_BE.dtos.ReviewDto;
import com.VidhikSaathi.VidhikSaathi_BE.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByServiceRequest_Provider_Id(Long providerId);
    @Query("Select AVG(r.rating)  FROM ServiceRequest sr\n" +
            "    LEFT JOIN\n" +
            "    Review r\n" +
            "    ON sr.id = r.serviceRequest.id\n" +
            "    WHERE sr.providerUsername = :providerUsername" )
    Double averageRatingByProviderUsername(@Param("providerUsername") String providerUsername);
}
