package com.VidhikSaathi.VidhikSaathi_BE.repository;

import com.VidhikSaathi.VidhikSaathi_BE.entity.ProviderProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProviderProfileRepository extends JpaRepository<ProviderProfile,Long> {
    List<ProviderProfile> findByVerifiedTrue();
    List<ProviderProfile> findAllByOrderByRatingDesc();
   Optional<ProviderProfile> findByUserId(Long id);
}
