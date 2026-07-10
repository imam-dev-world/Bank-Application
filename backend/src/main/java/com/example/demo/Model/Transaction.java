package com.example.demo.Model;

import java.math.BigDecimal;
import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Transaction {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne
	@JoinColumn(name ="from_account_id",nullable = true)
	private Account fromAccount ;
	
	@ManyToOne
	@JoinColumn(name ="to_account_id" ,nullable = true)
	private Account toAccount;
	
	@Column(nullable = false)
	private BigDecimal amount;
	
	@Column(nullable = false)
	private String type;
	
	@CreationTimestamp
	@Column(updatable = false)
	private Instant timestamp;

	public Transaction() {
	
	}

	public long getId() {
		return id;
	}

	public Account getfromAccount() {
		return fromAccount ;
	}

	public void setfromAccount(Account from_account_id) {
		this.fromAccount  = from_account_id;
	}

	public Account gettoAccount() {
		return toAccount;
	}

	public void settoAccount(Account to_account_id) {
		this.toAccount = to_account_id;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Instant getTimestamp() {
		return timestamp;
	}
}
