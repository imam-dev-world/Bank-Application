package com.example.demo.datatransferobject;

import java.math.BigDecimal;
import java.time.Instant;

public class TransactionResponse {
	
	private long id;
	private String type;
	private BigDecimal amount;
	private String direction;
	private Instant timestamp;
	private Long counterpartyAccountId;
	
	public TransactionResponse() {
		
	}
	public long getId() {
		return id;
	}
	public String getType() {
		return type;
	}
	public void setId(long id) {
		this.id = id;
	}
	public void setType(String type) {
		this.type = type;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	public void setDirection(String direction) {
		this.direction = direction;
	}
	public void setTimestamp(Instant timestamp) {
		this.timestamp = timestamp;
	}
	public void setCounterpartyAccountId(Long counterpartyAccountId) {
		this.counterpartyAccountId = counterpartyAccountId;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public String getDirection() {
		return direction;
	}
	public Instant getTimestamp() {
		return timestamp;
	}
	public Long getCounterpartyAccountId() {
		return counterpartyAccountId;
	}
}
