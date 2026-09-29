package com.vybe.vybe_backend.service;

import com.vybe.vybe_backend.dto.RegisterRequest;
import com.vybe.vybe_backend.dto.UserResponse;
import com.vybe.vybe_backend.dto.LoginRequest;
import com.vybe.vybe_backend.dto.LoginResponse;
import com.vybe.vybe_backend.exception.DuplicateEmailException;
import com.vybe.vybe_backend.exception.InvalidCredentialsException;
import com.vybe.vybe_backend.model.User;
import com.vybe.vybe_backend.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

   public UserService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        JwtService jwtService) {

    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
}

    public UserResponse registerUser(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException("Email is already registered");
        }

        String passwordHash =
                passwordEncoder.encode(request.getPassword());

        User user = new User(
                request.getName(),
                request.getEmail(),
                passwordHash
        );

        User savedUser = userRepository.save(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail()
        );
    }

    public LoginResponse loginUser(LoginRequest request) {

    String email = request.getEmail().trim().toLowerCase();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new InvalidCredentialsException("Invalid email or password"));

    if (!passwordEncoder.matches(
            request.getPassword(),
            user.getPasswordHash())) {

        throw new InvalidCredentialsException("Invalid email or password");
    }

    String token = jwtService.generateToken(user);

        return new LoginResponse(
        user.getId(),
        user.getName(),
        user.getEmail(),
        token
        );
    }

    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
            .stream()
            .map(user -> new UserResponse(
                    user.getId(),
                    user.getName(),
                    user.getEmail()
                )   
            )
        .toList();
    }
}