package com.VidhikSaathi.VidhikSaathi_BE.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ServiceRequestDto {

    private Long id;
    private Long clientId;
    private Long providerId;
    private String status;
    private String description;
    private LocalDateTime scheduledTime;
    private LocalDateTime createdAt;
}
