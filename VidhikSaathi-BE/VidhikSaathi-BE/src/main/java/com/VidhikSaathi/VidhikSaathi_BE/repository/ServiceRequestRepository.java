package com.VidhikSaathi.VidhikSaathi_BE.repository;
import com.VidhikSaathi.VidhikSaathi_BE.entity.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    List<ServiceRequest> findByClientUsername(String username);
    List<ServiceRequest> findByProviderUsername(String Username);


}
