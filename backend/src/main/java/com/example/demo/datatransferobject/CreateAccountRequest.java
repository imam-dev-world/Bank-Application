package com.example.demo.datatransferobject;


import jakarta.validation.constraints.NotBlank;

public class CreateAccountRequest {
	@NotBlank
	private String accountType;
	
	public String getAccountType() {
		return accountType;
	}
	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}
}
