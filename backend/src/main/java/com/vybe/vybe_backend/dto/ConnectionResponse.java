package com.vybe.vybe_backend.dto;

import com.vybe.vybe_backend.model.ConnectionStatus;

import java.time.Instant;

public class ConnectionResponse {

    private Long id;
    private Long requesterId;
    private Long receiverId;
    private ConnectionStatus status;
    private Instant createdAt;

    public ConnectionResponse(
            Long id,
            Long requesterId,
            Long receiverId,
            ConnectionStatus status,
            Instant createdAt) {

        this.id = id;
        this.requesterId = requesterId;
        this.receiverId = receiverId;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public Long getRequesterId() {
        return requesterId;
    }

    public Long getReceiverId() {
        return receiverId;
    }

    public ConnectionStatus getStatus() {
        return status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}