package com.example.demo.exception;

public class InvalidAccountTypeException extends RuntimeException {

	public InvalidAccountTypeException(String message) {
		super(message);
	}

}
