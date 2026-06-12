package com.example.demo.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<Map<String, String>> handleGlobalException(UserNotFoundException ex){
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error",ex.getMessage()));
	}
	@ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException ex) {
		return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error",ex.getMessage()));
        
    }
	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<Map<String, String>> handleBadCredentials(BadCredentialsException ex) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error",ex.getMessage()));
	}
	@ExceptionHandler(AccountNotFoundException.class)
	public ResponseEntity<Map<String, String>> handleAccountNotFoundException(AccountNotFoundException ex) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error",ex.getMessage()));
	}
	
	@ExceptionHandler(InvalidAccountTypeException .class)
	public ResponseEntity<Map<String, String>> handleInvalidAccountTypeException (InvalidAccountTypeException ex) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error",ex.getMessage()));
	}
}
