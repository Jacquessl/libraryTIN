package com.example.demo.Service;

import com.example.demo.Component.JwtUtil;
import com.example.demo.Entity.DTO.LoginRequest;
import com.example.demo.Entity.Employee;
import com.example.demo.Entity.User;
import com.example.demo.Repository.EmployeeRepositoryInterface;
import com.example.demo.Repository.UserRepositoryInterface;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    private final UserRepositoryInterface userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmployeeRepositoryInterface employeeRepository;
    public LoginService(UserRepositoryInterface userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, EmployeeRepositoryInterface employeeRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.employeeRepository = employeeRepository;
    }
    public String login (LoginRequest loginRequest) {
        Optional<User> userOpt = userRepository.findUserByUsernameOrEmail(loginRequest.getIdentifier(), loginRequest.getIdentifier());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPasswordHash())) {
                return jwtUtil.generateToken(user.getUsername(), "USER");
            }
        }
        Optional<Employee> employee = employeeRepository.findEmployeeByUsernameOrEmail(loginRequest.getIdentifier(), loginRequest.getIdentifier());
        if (employee.isPresent()) {
            Employee employeeLogging = employee.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), employeeLogging.getPasswordHash())) {
                return jwtUtil.generateToken(employeeLogging.getUsername(), employeeLogging.getPosition());
            }
        }
        return null;
    }
}
