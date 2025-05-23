package com.VidhikSaathi.VidhikSaathi_BE.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="SERVICEREQUEST")
public class ServiceRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User client;

    @ManyToOne
    private User provider;

    private String providerUsername;
    private String clientUsername;
    private String status;
    private String description;
    private LocalDateTime scheduledTime;

    private LocalDateTime createdAt = LocalDateTime.now();
}
