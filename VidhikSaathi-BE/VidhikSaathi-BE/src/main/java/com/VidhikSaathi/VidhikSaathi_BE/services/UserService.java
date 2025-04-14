package com.VidhikSaathi.VidhikSaathi_BE.services;

import com.VidhikSaathi.VidhikSaathi_BE.dtos.UserDto;
import com.VidhikSaathi.VidhikSaathi_BE.entity.User;
import com.VidhikSaathi.VidhikSaathi_BE.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserDto createUser(UserDto userDto) {
        User user = new User();
        System.out.println(userDto.toString());
        BeanUtils.copyProperties(userDto,user);
        System.out.println(user.toString());
        userRepository.save(user);
        BeanUtils.copyProperties(user,userDto);
        return userDto;
    }

    public UserDto getUserById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        optionalUser.ifPresent(user -> System.out.println(user.toString()));
        if(optionalUser.isEmpty()){
            System.out.println("User not found");
            return null;
        }
        User user = userRepository.findById(id).get();
        UserDto userDto = new UserDto();
        BeanUtils.copyProperties(user, userDto);
        return userDto;
    }

    public List<UserDto> getUsersByRole(String role) {
        List<User> users = userRepository.findByRole(role);
        List<UserDto> userDtos = new ArrayList<>();
        for(User user : users){
            UserDto userDto = new UserDto();
            BeanUtils.copyProperties(user,userDto);
            userDtos.add(userDto);
        }
        return userDtos;
    }
}
