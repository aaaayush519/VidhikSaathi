package com.VidhikSaathi.VidhikSaathi_BE.controller;
import com.VidhikSaathi.VidhikSaathi_BE.dtos.UserDto;
import com.VidhikSaathi.VidhikSaathi_BE.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){
        System.out.println("Api function called");
        UserDto response = userService.registerUser(userDto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id){
        UserDto response =  userService.getUserById(id);
        if(response == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
    @GetMapping("/role")
    public String getRole(Principal principal){
        String role = userService.getRole(principal.getName());
        return role;
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<UserDto>> getUsersByRole(@PathVariable String role){
        List<UserDto> response = userService.getUsersByRole(role);
        if(response == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
    @PostMapping("/login")
    public String login(@RequestBody UserDto userDto){
        return userService.verify(userDto);
    }

}
