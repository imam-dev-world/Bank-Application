package com.example.demo.datatransferobject;

import java.math.BigDecimal;

import jakarta.validation.constraints.Positive;
public class TransactionRequest {
	@Positive
	private long accountId;
	
	@Positive
	private BigDecimal amount;
	
	public long getAccountId() {
		return accountId;
	}
	
	public void setAccountId(long accountId) {
		this.accountId = accountId;
	}
	
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
}
