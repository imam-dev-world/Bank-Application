package com.example.demo.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.example.demo.Model.Account;
import com.example.demo.Model.Transaction;
import com.example.demo.datatransferobject.TransactionRequest;
import com.example.demo.datatransferobject.TransactionResponse;
import com.example.demo.datatransferobject.TransferRequest;
import com.example.demo.exception.AccountNotFoundException;
import com.example.demo.exception.InsufficientBalanceException;
import com.example.demo.exception.InvalidAmountException;
import com.example.demo.exception.SameAccountTransferException;
import com.example.demo.repository.AccountRepo;
import com.example.demo.repository.TransactionRepo;

import jakarta.transaction.Transactional;

@Service
@Validated
public class TransactionService {
	@Autowired
	TransactionRepo trans;
	
	@Autowired
	AccountRepo accrepo;
	
	@Transactional
	public String deposit(TransactionRequest tt) {
		Transaction transaction = new Transaction();
		Account acc=accrepo.findById(tt.getAccountId()).orElseThrow(()->new AccountNotFoundException("User account not found"));
		if(tt.getAmount().intValue()>0) {
			acc.setBalance(acc.getBalance().add(tt.getAmount()));
			accrepo.save(acc);
			
			transaction.settoAccount(acc);
			transaction.setAmount(tt.getAmount());
			transaction.setType("DEPOSIT");
			trans.save(transaction);
		}else {
			throw new InvalidAmountException("Amount must be in positive value");
		}
		return "Deposit successful";
	}
	
	@Transactional
	public String withdraw(TransactionRequest  tt) {
		Transaction transction = new Transaction();
		Account acc= accrepo.findById(tt.getAccountId()).orElseThrow(()->new AccountNotFoundException("User account not found"));
		if(tt.getAmount().compareTo(BigDecimal.ZERO) > 0) {
			if(tt.getAmount().compareTo(acc.getBalance())>0) {
				throw new InsufficientBalanceException("Balance is less than withdrawal amount");	
			}else {
				acc.setBalance(acc.getBalance().subtract(tt.getAmount()));
				accrepo.save(acc);
				
				transction.setfromAccount(acc);
				transction.setAmount(tt.getAmount());
				transction.setType("WITHDRAW");
				trans.save(transction);
			}
		}else {
			throw new InvalidAmountException("Amount Must be in positive value");
		}
		return "Withdrawal successfully";
	}
	
	@Transactional
	public String transfer(TransferRequest tr) {		
		Transaction trasaction = new Transaction();
		Account fromAcc  = accrepo.findById(tr.getFromAccount()).orElseThrow(()->new AccountNotFoundException("User account not found"));
		Account toAcc = accrepo.findById(tr.getToAccount()).orElseThrow(()->new AccountNotFoundException("User account not found"));
		if(fromAcc.getId()==(toAcc.getId())) {
			throw new SameAccountTransferException("Same account transfer is not possible");
		}else {
			if(tr.getAmount().compareTo(BigDecimal.ZERO) > 0) {
				
				if(fromAcc.getBalance().compareTo(tr.getAmount())<0) {
					throw new InsufficientBalanceException("Balance is less than transfer amount");
				}
				else {
					fromAcc.setBalance(fromAcc.getBalance().subtract(tr.getAmount()));
					toAcc.setBalance(toAcc.getBalance().add(tr.getAmount()));
					accrepo.save(fromAcc);
					accrepo.save(toAcc);
					
					trasaction.setAmount(tr.getAmount());
					trasaction.setfromAccount(fromAcc);
					trasaction.settoAccount(toAcc);
					trasaction.setType("TRANSFER");
					trans.save(trasaction);
					return "Sucessfully Transfer";
				}
			}else {
				throw new InvalidAmountException("Amount Must be in positive value");
			}
		}
	}
	
	public List<TransactionResponse> getTransactionHistory(long id ) {
		Account accId =accrepo.findById(id).orElseThrow(()->new AccountNotFoundException("Account not found")); //5
		List<Transaction> listOfRecord = trans.findTransactionHistory(accId.getId());
		List<TransactionResponse> result = new ArrayList<>();
		for (Transaction transaction : listOfRecord) {
	        TransactionResponse resp = new TransactionResponse();
	        resp.setId(transaction.getId());
	        resp.setType(transaction.getType());
	        resp.setAmount(transaction.getAmount());
	        resp.setTimestamp(transaction.getTimestamp());

	        if (transaction.getfromAccount() != null && transaction.getfromAccount().getId() == id) {
	            resp.setDirection("DEBIT");
	            if (transaction.gettoAccount() != null) {
	                resp.setCounterpartyAccountId(transaction.gettoAccount().getId());
	            }
	        } else {
	            resp.setDirection("CREDIT");
	            if (transaction.getfromAccount() != null) {
	                resp.setCounterpartyAccountId(transaction.getfromAccount().getId());
	            }
	        }
	        result.add(resp);
	    }
	    return result;
	}
}
