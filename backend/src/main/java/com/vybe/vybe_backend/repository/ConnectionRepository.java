package com.vybe.vybe_backend.repository;

import com.vybe.vybe_backend.model.Connection;
import com.vybe.vybe_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConnectionRepository extends JpaRepository<Connection, Long> {

    Optional<Connection> findByRequesterAndReceiver(
            User requester,
            User receiver
    );
}