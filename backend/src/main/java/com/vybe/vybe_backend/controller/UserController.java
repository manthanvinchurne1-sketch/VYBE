package com.vybe.vybe_backend.controller;

import com.vybe.vybe_backend.dto.RegisterRequest;
import com.vybe.vybe_backend.dto.UserResponse;
import com.vybe.vybe_backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.vybe.vybe_backend.dto.LoginRequest;
import com.vybe.vybe_backend.dto.LoginResponse;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@Valid @RequestBody RegisterRequest request) {
        return userService.registerUser(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
    return userService.loginUser(request);
    }
}