package com.iot.user.service;

import com.iot.user.dto.RegisterRequest;
import com.iot.user.dto.UserResponse;
import com.iot.user.model.User;
import com.iot.user.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class UserService {
        private     final UserRepository userRepository;
        /// /////////////////////////////registeration
        public UserResponse register(@Valid RegisterRequest request){
            if(userRepository.existsByUsername(request.getUsername())){
                throw new RuntimeException("Username Already Exists!! ");
            }
            User user = new User();
            user.setEmail(request.getEmail());
            user.setUsername(request.getUsername());
            user.setPassword(request.getPassword());
            user.setFirstname(request.getFirstname());
            user.setLastname(request.getLastname());


            User savedUser = userRepository.save(user);
            UserResponse save = new UserResponse();
            save.setId(savedUser.getId());
            save.setUsername(savedUser.getUsername());
            save.setEmail(savedUser.getEmail());
            save.setPassword(savedUser.getPassword());
            save.setFirstname(savedUser.getFirstname());
            save.setLastname(savedUser.getLastname());

            return save;
        }
/// //////////////////////////////////////////////////////////login
        public UserResponse login(String username,String password){
            if (username == null || username.isBlank()) {
                throw new IllegalArgumentException("Username cannot be empty");
            }

            if (password == null || password.isBlank()) {
                throw new IllegalArgumentException("Password cannot be empty");
            }

            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (!user.getPassword().equals(password)) {
                throw new IllegalArgumentException("Invalid password");
            }
            UserResponse userResponse = new UserResponse();
            userResponse.setId(user.getId());
            userResponse.setUsername(user.getUsername());
            userResponse.setEmail(user.getEmail());
            userResponse.setPassword(user.getPassword());
            userResponse.setFirstname(user.getFirstname());
            userResponse.setLastname(user.getLastname());
            return userResponse;

        }
/// //////////////////////////////////////////getting the profile
public UserResponse getUserProfile(String username) {
    User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

    UserResponse userResponse = new UserResponse();
    userResponse.setId(user.getId());
    userResponse.setUsername(user.getUsername());
    userResponse.setEmail(user.getEmail());
    userResponse.setFirstname(user.getFirstname());
    userResponse.setLastname(user.getLastname());
    userResponse.setPassword(user.getPassword());
    return userResponse;
    }

}
