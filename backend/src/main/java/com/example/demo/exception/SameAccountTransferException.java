package com.example.demo.exception;

public class SameAccountTransferException extends RuntimeException{

	public SameAccountTransferException(String message) {
		super(message);
	}

}
