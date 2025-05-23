package com.VidhikSaathi.VidhikSaathi_BE.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ServiceRequestDto {

    private Long id;
    private Long clientId;
    private String clientName;
    private String clientEmail;
    private String clientPhoneNumber;
    private String ProviderName;
    private String ProviderEmail;
    private String ProviderPhoneNumber;
    private Long providerId;
    private String status;
    private LocalDateTime createdAt;
}
