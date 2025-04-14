package com.VidhikSaathi.VidhikSaathi_BE.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String role;
    private LocalDateTime registeredAt;
}
