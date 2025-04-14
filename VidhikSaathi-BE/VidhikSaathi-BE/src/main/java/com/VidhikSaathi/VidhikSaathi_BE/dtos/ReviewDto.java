package com.VidhikSaathi.VidhikSaathi_BE.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReviewDto {
    private Long id;
    private Long serviceRequestId;
    private int rating;
    private String comment;
    private LocalDateTime createdAt;
}
