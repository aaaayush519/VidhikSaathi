package com.VidhikSaathi.VidhikSaathi_BE.services;

import com.VidhikSaathi.VidhikSaathi_BE.Security.service.JwtService;
import com.VidhikSaathi.VidhikSaathi_BE.dtos.UserDto;
import com.VidhikSaathi.VidhikSaathi_BE.entity.User;
import com.VidhikSaathi.VidhikSaathi_BE.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public UserDto registerUser(UserDto userDto) {
        User user = new User();
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setRole(userDto.getRole().toUpperCase());
        user.setPhone(userDto.getPhone());
        user.setUsername(userDto.getEmail().substring(0,userDto.getEmail().indexOf("@")));
        user.setPassword(passwordEncoder().encode(userDto.getPassword()));//To be encrypted
//        user.setPassword(userDto.getPassword());//To be encrypted
        user.setRegisteredAt(LocalDateTime.now());
        userRepository.save(user);
        BeanUtils.copyProperties(user, userDto);
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

    public String verify(UserDto userDto) {
        Authentication authenticate =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(userDto.getUsername(),userDto.getPassword())
                );
        if(authenticate.isAuthenticated()){
            return jwtService.generateToken(userDto);
//            return "jwtService.generateToken(userDto)";
        }
        return "failure";
    }
}
