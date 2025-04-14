package com.VidhikSaathi.VidhikSaathi_BE.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String role;
    private LocalDateTime registeredAt = LocalDateTime.now();

    @PrePersist
    public void prePersist(){
        if(this.registeredAt == null){
            this.registeredAt = LocalDateTime.now();
        }
    }
}
