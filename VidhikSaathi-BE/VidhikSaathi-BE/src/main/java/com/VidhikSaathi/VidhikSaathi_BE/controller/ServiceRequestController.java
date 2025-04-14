package com.VidhikSaathi.VidhikSaathi_BE.controller;

import com.VidhikSaathi.VidhikSaathi_BE.dtos.ServiceRequestDto;
import com.VidhikSaathi.VidhikSaathi_BE.services.ServiceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class ServiceRequestController {
    @Autowired
    private ServiceRequestService serviceRequestService;

    @PostMapping
    public ResponseEntity<ServiceRequestDto> addServiceRequest(@RequestBody ServiceRequestDto serviceRequestDto){
        ServiceRequestDto response = serviceRequestService.addServiceRequest(serviceRequestDto);
        if(response == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/client/{id}")
    public ResponseEntity<List<ServiceRequestDto>> getByClient(@PathVariable Long id){
        List<ServiceRequestDto> response = serviceRequestService.getByClient(id);
        if(response == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/provider/{id}")
    public ResponseEntity<List<ServiceRequestDto>> getByProvider(@PathVariable Long id){
        List<ServiceRequestDto> response = serviceRequestService.getByProvider(id);
        if(response == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceRequestDto> updateStatus(@PathVariable Long id , @RequestParam String status){
        //A functionality to update the status is to be created using Enums
        ServiceRequestDto response = serviceRequestService.updateStatus(id , status);
        if(response == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
}
