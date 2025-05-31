package com.VidhikSaathi.VidhikSaathi_BE.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {
    private Long id;
    private Long serviceRequestId;
    private Double rating;
    private Double averageRating;
    private String comment;
    private String providerUsername;
    private LocalDateTime createdAt;


    ReviewDto( Double averageRating){
//        this.providerUsername = providerUsername;
        this.averageRating = averageRating;
    }
}
