package com.VidhikSaathi.VidhikSaathi_BE.controller;

import com.VidhikSaathi.VidhikSaathi_BE.dtos.ProviderProfileDto;
import com.VidhikSaathi.VidhikSaathi_BE.dtos.UserDto;
import com.VidhikSaathi.VidhikSaathi_BE.services.ProviderProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/providers")
public class ProviderController {
    @Autowired
    private ProviderProfileService providerProfileService;

    @PostMapping
    public ResponseEntity<ProviderProfileDto> createProviderProfile(@RequestBody ProviderProfileDto providerProfileDto, Principal principal) {
        ProviderProfileDto response = providerProfileService.createProviderProfile(providerProfileDto , principal);
        if(response == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ProviderProfileDto>> getAllProviderProfiles() {
        List<ProviderProfileDto> response = providerProfileService.getAllProviderProfiles();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProviderProfileDto> getProviderProfileById(@PathVariable Long id){
        ProviderProfileDto response = providerProfileService.getProviderProfileById(id);
        if(response == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
    @GetMapping("/providerUsername")
    public ResponseEntity<ProviderProfileDto> getProviderProfileByProviderUsername(Principal principal){
        ProviderProfileDto response = providerProfileService.getProviderProfileByUsername(principal.getName());
        if(response == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
    @GetMapping("/toprated")
    public ResponseEntity<List<ProviderProfileDto>> getProviderProfileByToprated(){
        List<ProviderProfileDto> response = providerProfileService.getProviderProfileByTopRated();
        return ResponseEntity.ok(response);
    }

}
