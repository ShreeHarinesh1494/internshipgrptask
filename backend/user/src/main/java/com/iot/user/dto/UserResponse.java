package com.iot.user.dto;

import lombok.Data;

@Data
public class UserResponse {
    private String id;
    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private String password;
}
