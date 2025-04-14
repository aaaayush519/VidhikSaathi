package com.VidhikSaathi.VidhikSaathi_BE.dtos;

import lombok.Data;

@Data
public class ProviderProfileDto {
    private Long id;
    private Long userId;

    private String expertise;
    private String bio;
    private String barRegistrationNumber;
    private Boolean verified;
    private Double rating ;
}
