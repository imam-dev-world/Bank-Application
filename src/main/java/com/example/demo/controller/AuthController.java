package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.datatransferobject.LoginRequest;
import com.example.demo.datatransferobject.RegisterRequest;
import com.example.demo.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	AuthService ser;
	@PostMapping("/register")
	public String register(@Valid @RequestBody RegisterRequest reg) {
		return ser.registeruser(reg);
	}
	
	@PostMapping("/login")
	public String login(@Valid @RequestBody LoginRequest log) {
		return ser.loginuser(log);
	}
}
