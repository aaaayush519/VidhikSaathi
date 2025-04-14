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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProviderProfileService {
    @Autowired
    private ProviderProfileRepository providerProfileRepository;
    @Autowired
    private UserRepository userRepository;

    public ProviderProfileDto createProviderProfile(ProviderProfileDto providerProfileDto) {
        Optional<User> providerUser = userRepository.findById(providerProfileDto.getUserId());
        if(providerUser.isEmpty()){
            return null;
        }
        ProviderProfile providerProfile = new ProviderProfile();
        providerProfile.setUser(providerUser.get());
        providerProfile.setBio(providerProfileDto.getBio());
        providerProfile.setExpertise(providerProfileDto.getExpertise());
        providerProfile.setBarRegistrationNumber(providerProfileDto.getBarRegistrationNumber());
        providerProfile.setVerified(Boolean.FALSE);
        providerProfile.setRating(0.5);
        providerProfileRepository.save(providerProfile);
        BeanUtils.copyProperties(providerProfile, providerProfileDto);
        return providerProfileDto;
    }

    public List<ProviderProfileDto> getAllProviderProfiles() {
        List<ProviderProfile> providerProfiles = providerProfileRepository.findAll();
        List<ProviderProfileDto> providerProfileDtos = new ArrayList<>();
        for(ProviderProfile providerProfile : providerProfiles){
            ProviderProfileDto providerProfileDto = new ProviderProfileDto();
            BeanUtils.copyProperties(providerProfile, providerProfileDto);
            providerProfileDtos.add(providerProfileDto);
        }
        return providerProfileDtos;
    }

    public ProviderProfileDto gerProviderProfileById(Long id) {
        Optional<ProviderProfile> providerProfile = providerProfileRepository.findById(id);
        if(providerProfile.isEmpty()){
            return null;
        }
        ProviderProfileDto providerProfileDto = new ProviderProfileDto();
        BeanUtils.copyProperties(providerProfile.get(),providerProfileDto);
        providerProfileDto.setUserId(providerProfile.get().getUser().getId());
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
}
