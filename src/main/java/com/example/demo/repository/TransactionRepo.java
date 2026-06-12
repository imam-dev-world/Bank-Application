package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Model.Transaction;

public interface TransactionRepo extends JpaRepository<Transaction, Long> {
	@Query("SELECT t FROM Transaction t WHERE t.fromAccount.id=:accountId OR t.toAccount.id=:accountId ORDER BY t.timestamp DESC")
	List<Transaction> findTransactionHistory(@Param("accountId") long accountId);
}
