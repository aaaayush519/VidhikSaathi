package com.VidhikSaathi.VidhikSaathi_BE.controller;

import com.VidhikSaathi.VidhikSaathi_BE.dtos.ServiceRequestDto;
import com.VidhikSaathi.VidhikSaathi_BE.services.ServiceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;


@RestController
@RequestMapping("/api/requests")
public class ServiceRequestController {
    @Autowired
    private ServiceRequestService serviceRequestService;

    @PostMapping
    public ResponseEntity<ServiceRequestDto> addServiceRequest(@RequestBody ServiceRequestDto serviceRequestDto , Principal principal) {
        ServiceRequestDto response = serviceRequestService.addServiceRequest(serviceRequestDto.getProviderId(), principal);
        if(response == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/userRequests")
    public ResponseEntity<List<ServiceRequestDto>> getByClient(Principal principal){
        List<ServiceRequestDto> response = serviceRequestService.getByClient(principal.getName());
        if(response == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/providerRequests")
    public ResponseEntity<List<ServiceRequestDto>> getByProvider(Principal principal){
        List<ServiceRequestDto> response = serviceRequestService.getByProvider(principal.getName());
        if(response == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/updateStatus/{id}")
    public ResponseEntity<ServiceRequestDto> updateStatus(@PathVariable Long id , @RequestParam("newStatus") String newStatus){
        //A functionality to update the status is to be created using Enums
        ServiceRequestDto response = serviceRequestService.updateStatus(id , newStatus);
        if(response == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
}
