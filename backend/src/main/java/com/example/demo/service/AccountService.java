package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.example.demo.Model.Account;
import com.example.demo.Model.User;
import com.example.demo.datatransferobject.AccountRequestResponse;
import com.example.demo.datatransferobject.CreateAccountRequest;
import com.example.demo.exception.AccountNotFoundException;
import com.example.demo.exception.InvalidAccountTypeException;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.repository.AccountRepo;
import com.example.demo.repository.AuthRepo;

@Service
@Validated
public class AccountService {
	@Autowired
	AccountRepo repo;
	@Autowired
	AuthRepo userrepo;
	
	public AccountRequestResponse createAccount(long id,CreateAccountRequest acc) {
		Account account = new Account();
		AccountRequestResponse resp=new AccountRequestResponse();
		User user = userrepo.findById(id).orElseThrow(()-> new UserNotFoundException("User not founded"));
		account.setUser(user);
		String accountType= acc.getAccountType().toUpperCase();
		String accountNumber;
			if(accountType.equals("SAVINGS") || accountType.equals("CURRENT")) {
				accountNumber = "ACC" + System.currentTimeMillis();
				account.setAccountNumber(accountNumber);
				account.setAccountType(accountType);
				repo.save(account);
			}else {
				throw new InvalidAccountTypeException("Invalid account type select SAVINGS or CURRENT");
			}
			resp.setAccountNumber(accountNumber);
			resp.setAccountType(accountType);
			resp.setBalance(account.getBalance());
			resp.setId(account.getId());
		return resp;
	}
	
	public AccountRequestResponse getAccount(long id) {
		Account acc = repo.findById(id).orElseThrow(()->new AccountNotFoundException("Account not found"));
		AccountRequestResponse resp=new AccountRequestResponse();
		resp.setId(acc.getId());
		resp.setBalance(acc.getBalance());
		resp.setAccountNumber(acc.getAccountNumber());
		resp.setAccountType(acc.getAccountType());
		return resp;
	}
	
	public List<AccountRequestResponse> getAllAccount(long id) {
		List<AccountRequestResponse> result = new ArrayList<>(); 
		if(userrepo.existsById(id)) {
		List<Account>acc=repo.findByUserId_Id(id);
		for(Account acc1:acc) {
			AccountRequestResponse resp=new AccountRequestResponse();
			resp.setId(acc1.getId());
			resp.setBalance(acc1.getBalance());
			resp.setAccountType(acc1.getAccountType());
			resp.setAccountNumber(acc1.getAccountNumber());
			result.add(resp);
			}
		return result;
		}
		else {
			throw new UserNotFoundException("user not found");
		}
	} 
}
