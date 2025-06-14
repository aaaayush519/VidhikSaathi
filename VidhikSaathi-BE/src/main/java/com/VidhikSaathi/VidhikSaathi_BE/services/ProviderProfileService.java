package com.VidhikSaathi.VidhikSaathi_BE.services;

import com.VidhikSaathi.VidhikSaathi_BE.dtos.ProviderProfileDto;
import com.VidhikSaathi.VidhikSaathi_BE.dtos.UserDto;
import com.VidhikSaathi.VidhikSaathi_BE.entity.ProviderProfile;
import com.VidhikSaathi.VidhikSaathi_BE.entity.User;
import com.VidhikSaathi.VidhikSaathi_BE.repository.ProviderProfileRepository;
import com.VidhikSaathi.VidhikSaathi_BE.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProviderProfileService {
    @Autowired
    private ProviderProfileRepository providerProfileRepository;
    @Autowired
    private UserRepository userRepository;

    public ProviderProfileDto createProviderProfile(ProviderProfileDto providerProfileDto, Principal principal) {
        User providerUser = userRepository.findByUsername(principal.getName());

        ProviderProfile providerProfile = new ProviderProfile();
        providerProfile.setUser(providerUser);
        providerProfile.setBio(providerProfileDto.getBio());
        providerProfile.setExpertise(providerProfileDto.getExpertise());
        providerProfile.setBarRegistrationNumber(providerProfileDto.getBarRegistrationNumber());
        providerProfile.setVerified(Boolean.FALSE);
        providerUser.setCompletionStatus(Boolean.TRUE);
        userRepository.save(providerUser);
        providerProfile.setRating(0.5);
        providerProfileRepository.save(providerProfile);
        BeanUtils.copyProperties(providerProfile, providerProfileDto);
        providerProfileDto.setName(providerProfile.getUser().getName());
        providerProfileDto.setUserId(providerProfile.getUser().getId());
        providerProfileDto.setPhone(providerProfile.getUser().getPhone());
        providerProfileDto.setEmail(providerProfile.getUser().getEmail());
        return providerProfileDto;
    }

    public List<ProviderProfileDto> getAllProviderProfiles() {
        List<ProviderProfile> providerProfiles = providerProfileRepository.findAll();
        List<ProviderProfileDto> providerProfileDtos = new ArrayList<>();
        for(ProviderProfile providerProfile : providerProfiles){
            ProviderProfileDto providerProfileDto = new ProviderProfileDto();
            BeanUtils.copyProperties(providerProfile, providerProfileDto);
            providerProfileDto.setName(providerProfile.getUser().getName());
            providerProfileDto.setPhone(providerProfile.getUser().getPhone());
            providerProfileDto.setEmail(providerProfile.getUser().getEmail());
            providerProfileDtos.add(providerProfileDto);
        }
        return providerProfileDtos;
    }

    public ProviderProfileDto getProviderProfileById(Long id) {
        Optional<ProviderProfile> providerProfile = providerProfileRepository.findById(id);
        if(providerProfile.isEmpty()){
            return null;
        }
        ProviderProfileDto providerProfileDto = new ProviderProfileDto();
        BeanUtils.copyProperties(providerProfile.get(),providerProfileDto);
        providerProfileDto.setUserId(providerProfile.get().getUser().getId());
        providerProfileDto.setName(providerProfile.get().getUser().getName());
        providerProfileDto.setPhone(providerProfile.get().getUser().getPhone());
        providerProfileDto.setEmail(providerProfile.get().getUser().getEmail());
        return providerProfileDto;
    }

    public List<ProviderProfileDto> getProviderProfileByTopRated() {
        List<ProviderProfile> providerProfiles = providerProfileRepository.findAllByOrderByRatingDesc();
        List<ProviderProfileDto> providerProfileDtos = new ArrayList<>();
        for(ProviderProfile providerProfile : providerProfiles){
            ProviderProfileDto providerProfileDto = new ProviderProfileDto();
            BeanUtils.copyProperties(providerProfile,providerProfileDto);
            providerProfileDtos.add(providerProfileDto);
        }
        return providerProfileDtos;
    }

    public ProviderProfileDto getProviderProfileByUsername(String username) {
        User provider = userRepository.findByUsername(username);
        ProviderProfileDto providerProfileDto = new ProviderProfileDto();
        providerProfileDto.setName(provider.getName());
        providerProfileDto.setPhone(provider.getPhone());
        providerProfileDto.setEmail(provider.getEmail());
        providerProfileDto.setUserId(provider.getId());
        providerProfileDto.setUsername(provider.getUsername());
        providerProfileDto.setCompletionStatus(provider.getCompletionStatus());
        if(providerProfileDto.getCompletionStatus().equals(Boolean.TRUE)){
            Optional<ProviderProfile> providerProfile = providerProfileRepository.findByUserId(provider.getId());
            if(providerProfile.isPresent()){
                providerProfileDto.setBarRegistrationNumber(providerProfile.get().getBarRegistrationNumber());
                providerProfileDto.setExpertise(providerProfile.get().getExpertise());
                providerProfileDto.setBio(providerProfile.get().getBio());
            }

        }
        return providerProfileDto;
    }
}
