package com.example.demo.Config;

import com.example.demo.Entity.Employee;
import com.example.demo.Entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class UserInfoDetails implements UserDetails {
    private String username;
    private String password;
    private List<GrantedAuthority> authorities;
    public UserInfoDetails(User user) {
        this.username = user.getUsername(); // Assuming 'name' is used as 'username'
        this.password = user.getPasswordHash();
        this.authorities = List.of("USER".split(","))
                .stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
    public UserInfoDetails(Employee employee) {
        this.username = employee.getUsername();
        this.password = employee.getPasswordHash();
        this.authorities = List.of(employee.getPosition().split(","))
                .stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }
}
