package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Account;

public interface AccountRepo extends JpaRepository<Account, Long> {
	Optional<Account> findByAccountNumber(String accountNumber);
	List<Account> findByUserId_Id(long userId);
}
