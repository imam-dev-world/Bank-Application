package com.example.demo.datatransferobject;

import java.math.BigDecimal;

import jakarta.validation.constraints.Positive;

public class TransferRequest {
	@Positive
	private long fromAccount;
	@Positive
	private long toAccount;
	@Positive
	private BigDecimal amount;

	public long getFromAccount() {
		return fromAccount;
	}

	public void setFromAccount(long fromId) {
		this.fromAccount = fromId;
	}

	public long getToAccount() {
		return toAccount;
	}

	public void setToAccount(long toId) {
		this.toAccount = toId;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	
}
