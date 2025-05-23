package com.VidhikSaathi.VidhikSaathi_BE.services;

import com.VidhikSaathi.VidhikSaathi_BE.dtos.ServiceRequestDto;
import com.VidhikSaathi.VidhikSaathi_BE.entity.ProviderProfile;
import com.VidhikSaathi.VidhikSaathi_BE.entity.ServiceRequest;
import com.VidhikSaathi.VidhikSaathi_BE.entity.User;
import com.VidhikSaathi.VidhikSaathi_BE.repository.ProviderProfileRepository;
import com.VidhikSaathi.VidhikSaathi_BE.repository.ServiceRequestRepository;
import com.VidhikSaathi.VidhikSaathi_BE.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceRequestService {
    @Autowired
    private ServiceRequestRepository serviceRequestRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProviderProfileRepository providerProfileRepository;

    public ServiceRequestDto addServiceRequest(Long providerId , Principal principal) {
        ServiceRequestDto serviceRequestDto = new ServiceRequestDto();
        User client = userRepository.findByUsername(principal.getName());
        ProviderProfile provider = providerProfileRepository.findById(providerId).orElseThrow();
        ServiceRequest serviceRequest = new ServiceRequest();
        serviceRequest.setClient(client);
        serviceRequest.setClientUsername(client.getName());
        serviceRequest.setProvider(provider.getUser());
        serviceRequest.setProviderUsername(provider.getUser().getUsername());
        serviceRequest.setStatus("PENDING");
        serviceRequest.setCreatedAt(LocalDateTime.now());
        //Incomplete for status , Enums to be added
         serviceRequestRepository.save(serviceRequest);
        System.out.println(serviceRequest);
        return serviceRequestDto;
    }

    public List<ServiceRequestDto> getByClient(String username) {
        List<ServiceRequest> serviceRequests = serviceRequestRepository.findByClientUsername(username);
        if(serviceRequests.isEmpty()){
            return null;
        }
        List<ServiceRequestDto> serviceRequestDtos = new ArrayList<>();
        for(ServiceRequest serviceRequest : serviceRequests){
            ServiceRequestDto serviceRequestDto = new ServiceRequestDto();
            BeanUtils.copyProperties(serviceRequest, serviceRequestDto);
            serviceRequestDto.setProviderId(serviceRequest.getProvider().getId());
            serviceRequestDto.setProviderName(serviceRequest.getProvider().getName());
            serviceRequestDto.setProviderEmail(serviceRequest.getProvider().getEmail());
            serviceRequestDto.setProviderPhoneNumber(userRepository.findByUsername(serviceRequest.getProviderUsername()).getPhone());
            serviceRequestDto.setStatus(serviceRequest.getStatus());
            serviceRequestDtos.add(serviceRequestDto);
        }
        return serviceRequestDtos;
    }

    public List<ServiceRequestDto> getByProvider(String username) {

        List<ServiceRequest> serviceRequests = serviceRequestRepository.findByProviderUsername(username);
        if(serviceRequests.isEmpty()){
            return null;
        }
        List<ServiceRequestDto> serviceRequestDtos = new ArrayList<>();
        for(ServiceRequest serviceRequest : serviceRequests){
            ServiceRequestDto serviceRequestDto = new ServiceRequestDto();
            BeanUtils.copyProperties(serviceRequest, serviceRequestDto);
            serviceRequestDto.setClientId(serviceRequest.getClient().getId());
            serviceRequestDto.setClientName(serviceRequest.getClient().getName());
            serviceRequestDto.setClientEmail(serviceRequest.getClient().getEmail());
            serviceRequestDto.setClientPhoneNumber(serviceRequest.getClient().getPhone());
            serviceRequestDto.setProviderId(serviceRequest.getProvider().getId());
            serviceRequestDtos.add(serviceRequestDto);
        }
        return serviceRequestDtos;
    }

    public ServiceRequestDto updateStatus(Long id, String status) {
        Optional<ServiceRequest> serviceRequest = serviceRequestRepository.findById(id);
        if(serviceRequest.isEmpty()){
            return null;
        }
        serviceRequest.get().setStatus(status.toUpperCase());
        serviceRequestRepository.save(serviceRequest.get());
        ServiceRequestDto serviceRequestDto = new ServiceRequestDto();
        BeanUtils.copyProperties(serviceRequest.get(),serviceRequestDto);
        serviceRequestDto.setClientId(serviceRequest.get().getClient().getId());
        serviceRequestDto.setProviderId(serviceRequest.get().getProvider().getId());
        return serviceRequestDto;
    }
}
