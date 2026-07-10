package com.example.demo.Model;

import java.math.BigDecimal;
import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id",nullable = false)
	private User userId;
	
	@Column(name="account_number",nullable = false, unique = true, length = 20)
	private String accountNumber;
	
	@Column(name="balance",nullable = false)
	private BigDecimal balance=BigDecimal.ZERO;
	
	@Column(name="account_type",nullable = false)
	private String accountType;
	
	@CreationTimestamp
	@Column(updatable = false)
	private Instant created_at;

	public Account() {
		
	}

	public long getId() {
		return id;
	}

	public User getUser() {
		return userId;
	}

	public void setUser(User user_id) {
		this.userId = user_id;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public BigDecimal getBalance() {
		return balance;
	}

	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}

	public String getAccountType() {
		return accountType;
	}

	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}

	public Instant getCreated_at() {
		return created_at;
	}
	
}
