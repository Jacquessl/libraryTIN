package com.example.demo.Service;

import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepositoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.example.demo.Component.UserInfoDetails;

import java.util.Optional;

@Service
public class UserInfoService implements UserDetailsService {

    @Autowired
    private UserRepositoryInterface repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userDetail = repository.findUserByUsernameOrEmail(username, username);

        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }
}