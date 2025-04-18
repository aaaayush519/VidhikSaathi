package com.VidhikSaathi.VidhikSaathi_BE.repository;

import com.VidhikSaathi.VidhikSaathi_BE.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    List<User> findByRole(String role);

    User findByUsername(String username);
    Optional<User> findById(Long id);
}
