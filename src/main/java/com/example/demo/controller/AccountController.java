package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.datatransferobject.AccountRequestResponse;
import com.example.demo.datatransferobject.CreateAccountRequest;
import com.example.demo.service.AccountService;

import jakarta.validation.Valid;
@RestController
@RequestMapping("/account")
public class AccountController {
	@Autowired
	AccountService acc;
	
	@PostMapping("/create")
	public String createAccount(@Valid @RequestBody CreateAccountRequest a) {
		return acc.createAccount(a);
	}
	
	@GetMapping("getaccount/{id}")
	public AccountRequestResponse getAccount(@PathVariable long id) {
		return acc.getAccount(id);
	}
	
	@GetMapping("getallaccount/{id}")
	public List<AccountRequestResponse> getAllAccount(@PathVariable long id) {
		return acc.getAllAccount(id);
	}
}
