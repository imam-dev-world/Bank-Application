package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.datatransferobject.TransactionRequest;
import com.example.demo.datatransferobject.TransactionResponse;
import com.example.demo.datatransferobject.TransferRequest;
import com.example.demo.service.TransactionService;

@RestController
@RequestMapping("transactions")
public class TransactionController {
	@Autowired
	TransactionService ts;
	
	@PostMapping("deposit")
	public String deposit(@RequestBody TransactionRequest tt) {
		return ts.deposit(tt);
	}
	
	@PostMapping("withdraw")
	public String withdraw(@RequestBody TransactionRequest tt) {
		return ts.withdraw(tt);
	}
	
	@PostMapping("transfer")
	public String transfer(@RequestBody TransferRequest tt) {
		return ts.transfer(tt);
	}
	
	@GetMapping("/history/{id}")
	public Page<TransactionResponse> getTransactionHistory(@PathVariable long id,Pageable pageable) {
		return ts.getTransactionHistory(id,pageable);
	}
}
