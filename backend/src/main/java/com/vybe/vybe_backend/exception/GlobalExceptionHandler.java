package com.vybe.vybe_backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateEmailException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String, String> handleDuplicateEmail(
            DuplicateEmailException exception) {

        return Map.of(
                "message", exception.getMessage()
        );
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Map<String, String> handleInvalidCredentials(
            InvalidCredentialsException exception) {

        return Map.of(
            "message", exception.getMessage()
        );
    }

    @ExceptionHandler(ReceiverNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> handleReceiverNotFound(
            ReceiverNotFoundException exception) {

        return Map.of(
            "message", exception.getMessage()
        );
    }

    @ExceptionHandler(ConnectionAlreadyExistsException.class)
    public ResponseEntity<String> handleConnectionAlreadyExists(
        ConnectionAlreadyExistsException ex) {

    return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(ex.getMessage());
    }
}