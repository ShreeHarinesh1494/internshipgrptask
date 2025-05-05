package com.iot.user.controller;


import com.iot.user.dto.LoginRequest;
import com.iot.user.dto.RegisterRequest;
import com.iot.user.dto.UserResponse;
import com.iot.user.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("api/users")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request){
        return ResponseEntity.ok(userService.register(request));
    }
    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.login(request.getUsername(), request.getPassword()));
    }
    @GetMapping("/profile/{username}")
    public ResponseEntity<UserResponse> profile(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserProfile(username));
    }


}
