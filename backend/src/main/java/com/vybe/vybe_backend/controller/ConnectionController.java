package com.vybe.vybe_backend.controller;

import com.vybe.vybe_backend.dto.ConnectionRequest;
import com.vybe.vybe_backend.dto.ConnectionResponse;
import com.vybe.vybe_backend.service.ConnectionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/connections")
public class ConnectionController {

    private final ConnectionService connectionService;

    public ConnectionController(ConnectionService connectionService) {
        this.connectionService = connectionService;
    }

    @PostMapping("/request")
    @ResponseStatus(HttpStatus.CREATED)
    public ConnectionResponse sendRequest(
            @Valid @RequestBody ConnectionRequest request,
            @AuthenticationPrincipal Jwt jwt) {

        String requesterEmail = jwt.getSubject();

        return connectionService.sendRequest(
                requesterEmail,
                request
        );
    }
}