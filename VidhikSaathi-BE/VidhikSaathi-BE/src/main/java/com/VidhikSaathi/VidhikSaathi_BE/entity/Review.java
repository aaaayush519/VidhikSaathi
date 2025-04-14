package com.VidhikSaathi.VidhikSaathi_BE.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private ServiceRequest serviceRequest;

    private int rating;
    private String comment;
    private LocalDateTime createdAt = LocalDateTime.now();

}
