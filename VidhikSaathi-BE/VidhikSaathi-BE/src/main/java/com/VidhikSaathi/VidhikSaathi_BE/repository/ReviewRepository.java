package com.VidhikSaathi.VidhikSaathi_BE.repository;

import com.VidhikSaathi.VidhikSaathi_BE.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByServiceRequest_Provider_Id(Long providerId);
}
