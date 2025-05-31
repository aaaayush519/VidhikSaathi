package com.VidhikSaathi.VidhikSaathi_BE.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="PROVIDERPROFILE")
public class ProviderProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name="USER_ID")
    private User user;

    private String expertise;
    private String bio;
    private String barRegistrationNumber;
    private Boolean verified;
    private Double rating ;

}
