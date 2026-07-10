package com.example.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.repository.AuthRepo;
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	AuthRepo user;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return user.findByEmail(username).orElseThrow(()->new UsernameNotFoundException("User not founded"));
	}
}
