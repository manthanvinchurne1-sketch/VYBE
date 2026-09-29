package com.vybe.vybe_backend.service;

import com.vybe.vybe_backend.dto.ConnectionRequest;
import com.vybe.vybe_backend.model.Connection;
import com.vybe.vybe_backend.model.User;
import com.vybe.vybe_backend.repository.ConnectionRepository;
import com.vybe.vybe_backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.vybe.vybe_backend.dto.ConnectionResponse;
import com.vybe.vybe_backend.exception.ReceiverNotFoundException;
import java.util.Optional;
import com.vybe.vybe_backend.exception.ConnectionAlreadyExistsException;

@Service
public class ConnectionService {

    private final ConnectionRepository connectionRepository;
    private final UserRepository userRepository;

    public ConnectionService(
            ConnectionRepository connectionRepository,
            UserRepository userRepository) {

        this.connectionRepository = connectionRepository;
        this.userRepository = userRepository;
    }

    public ConnectionResponse sendRequest(
        String requesterEmail,
        ConnectionRequest request) {

        User requester = userRepository.findByEmail(requesterEmail)
                .orElseThrow(() ->
                        new IllegalArgumentException("Requester not found"));

        User receiver = userRepository.findById(request.getReceiverId())
                .orElseThrow(() ->
                        new ReceiverNotFoundException("Receiver not found"));

        if (requester.getId().equals(receiver.getId())) {
            throw new IllegalArgumentException(
                    "You cannot send a connection request to yourself");
        }

        Optional<Connection> existingConnection =
        connectionRepository.findByRequesterAndReceiver(
                requester,
                receiver
        );

        Optional<Connection> reverseConnection =
        connectionRepository.findByRequesterAndReceiver(
                receiver,
                requester
        );

        if (existingConnection.isPresent() || reverseConnection.isPresent()) {
            throw new ConnectionAlreadyExistsException(
                    "Connection request already exists"
                );
            
        }

        Connection connection = new Connection(requester, receiver);

         Connection savedConnection = connectionRepository.save(connection);

        return new ConnectionResponse(
            savedConnection.getId(),
            savedConnection.getRequester().getId(),
            savedConnection.getReceiver().getId(),
            savedConnection.getStatus(),
            savedConnection.getCreatedAt()
        );
    }
}