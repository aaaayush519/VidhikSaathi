package com.VidhikSaathi.VidhikSaathi_BE.dtos;

import lombok.Data;

@Data
public class ProviderProfileDto {
    private Long id;
    private Long userId;
    private String Name;
    private String username;
    private String phone;
    private String email;
    private String expertise;
    private String bio;
    private String barRegistrationNumber;
    private Boolean completionStatus;
    private Boolean verified;
    private Double rating ;
}
