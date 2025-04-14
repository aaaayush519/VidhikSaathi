package com.VidhikSaathi.VidhikSaathi_BE.services;

import com.VidhikSaathi.VidhikSaathi_BE.dtos.ServiceRequestDto;
import com.VidhikSaathi.VidhikSaathi_BE.entity.ServiceRequest;
import com.VidhikSaathi.VidhikSaathi_BE.entity.User;
import com.VidhikSaathi.VidhikSaathi_BE.repository.ServiceRequestRepository;
import com.VidhikSaathi.VidhikSaathi_BE.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public ServiceRequestDto addServiceRequest(ServiceRequestDto serviceRequestDto) {
        Optional<User> client = userRepository.findById(serviceRequestDto.getClientId());
        Optional<User> provider = userRepository.findById(serviceRequestDto.getProviderId());
        if(client.isEmpty() || provider.isEmpty()){
            System.out.println("Client or provider not found");
            return null;
        }
        if(!provider.get().getRole().equalsIgnoreCase("PROVIDER")){
            System.out.println("Provider user is not a provider");
            return null;
        }
        ServiceRequest serviceRequest = new ServiceRequest();
        serviceRequest.setClient(client.get());
        serviceRequest.setProvider(provider.get());
        serviceRequest.setStatus("PENDING");
        serviceRequest.setDescription(serviceRequestDto.getDescription());
        serviceRequest.setCreatedAt(LocalDateTime.now());
        serviceRequest.setScheduledTime(serviceRequestDto.getScheduledTime());
        //Incomplete for status , Enums to be added
        serviceRequestRepository.save(serviceRequest);
        BeanUtils.copyProperties(serviceRequest, serviceRequestDto);
        return serviceRequestDto;
    }

    public List<ServiceRequestDto> getByClient(Long id) {
        List<ServiceRequest> serviceRequests = serviceRequestRepository.findByClientId(id);
        if(serviceRequests.isEmpty()){
            return null;
        }
        List<ServiceRequestDto> serviceRequestDtos = new ArrayList<>();
        for(ServiceRequest serviceRequest : serviceRequests){
            ServiceRequestDto serviceRequestDto = new ServiceRequestDto();
            BeanUtils.copyProperties(serviceRequest, serviceRequestDto);
            serviceRequestDtos.add(serviceRequestDto);
        }
        return serviceRequestDtos;
    }

    public List<ServiceRequestDto> getByProvider(Long id) {
        List<ServiceRequest> serviceRequests = serviceRequestRepository.findByProviderId(id);
        if(serviceRequests.isEmpty()){
            return null;
        }
        List<ServiceRequestDto> serviceRequestDtos = new ArrayList<>();
        for(ServiceRequest serviceRequest : serviceRequests){
            ServiceRequestDto serviceRequestDto = new ServiceRequestDto();
            BeanUtils.copyProperties(serviceRequest, serviceRequestDto);
            serviceRequestDto.setClientId(serviceRequest.getClient().getId());
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
