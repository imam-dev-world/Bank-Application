package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.example.demo.Model.User;
import com.example.demo.datatransferobject.LoginRequest;
import com.example.demo.datatransferobject.LoginResponse;
import com.example.demo.datatransferobject.RegisterRequest;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.repository.AuthRepo;
import com.example.demo.security.JwtService;
@Validated
@Service
public class AuthService {
	@Autowired
	AuthRepo repo;
	
	@Autowired
	PasswordEncoder pe;
	
	@Autowired
	AuthenticationManager am;
	
	@Autowired
    private JwtService jwt;
	public String registeruser(RegisterRequest log) {
		User user = new User();
		if(repo.findByEmail(log.getEmail()).isPresent()) {
			throw new RuntimeException("the user with this email already there");
		}
		user.setName(log.getName());
		user.setEmail(log.getEmail());
		user.setPassword(pe.encode(log.getPassword()));
		repo.save(user);
		return "register completed";
	}
	
	public LoginResponse loginuser(LoginRequest log) {
		am.authenticate(new UsernamePasswordAuthenticationToken(log.getEmail(), log.getPassword()));
		User user=repo.findByEmail(log.getEmail()).orElseThrow(()->new UserNotFoundException("User not found"));
		String token = jwt.generateToken(user);
		return new LoginResponse(token,user.getId(),user.getName(),user.getEmail());
	}
}	
