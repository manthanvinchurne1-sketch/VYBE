package com.vybe.vybe_backend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ConnectionRequest {

    @NotNull(message = "Receiver ID is required")
    @Positive(message = "Receiver ID must be positive")
    private Long receiverId;

    public ConnectionRequest() {
    }

    public Long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
    }
}