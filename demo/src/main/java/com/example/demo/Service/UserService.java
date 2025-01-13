package com.example.demo.Service;

import com.example.demo.Config.UserInfoDetails;
import com.example.demo.Entity.DTO.AddUserDTO;
import com.example.demo.Entity.DTO.EditUserDTO;
import com.example.demo.Entity.User;
import com.example.demo.Repository.EmployeeRepositoryInterface;
import com.example.demo.Repository.LoanRepositoryInterface;
import com.example.demo.Repository.UserRepositoryInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepositoryInterface userRepository;
    private final EmployeeRepositoryInterface employeeRepository;
    private final LoanRepositoryInterface loanRepository;

    public UserService(UserRepositoryInterface userRepository, PasswordEncoder passwordEncoder,
                       EmployeeRepositoryInterface employeeRepository, LoanRepositoryInterface loanRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.employeeRepository = employeeRepository;
        this.loanRepository = loanRepository;
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public User getUserById(int id) {
        return userRepository.findById(id).get();
    }
    public List<User> getUserByFirstName(String firstName) {
        return userRepository.findUsersByFirstName(firstName);
    }
    public List<User> getUserByLastName(String lastName) {
        return userRepository.findUsersByLastName(lastName);
    }
    public List<User> getUserByUsernameContaining(String username) {
        return userRepository.findUsersByUsernameContaining(username);
    }
    public User getUserByUsername(Authentication authentication){
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserInfoDetails uid) {
            return userRepository.findUserByUsername(uid.getUsername());
        }
        return null;
    }
    public ResponseEntity<User> addUser(AddUserDTO userDTO) {
        if(employeeRepository.findEmployeeByUsernameOrEmail(userDTO.getUsername(), userDTO.getEmail()).isEmpty() && userRepository.findUserByUsernameOrEmail(userDTO.getUsername(), userDTO.getEmail()).isEmpty()) {
            User user = new User();
            user.setFirstName(userDTO.getFirstName());
            user.setLastName(userDTO.getLastName());
            user.setUsername(userDTO.getUsername());
            user.setPasswordHash(passwordEncoder.encode(userDTO.getPassword()));
            user.setEmail(userDTO.getEmail());
            user.setPhone(userDTO.getPhone());
            user.setRegisteredDate(LocalDateTime.now());
            User savedUser = userRepository.save(user);
            return ResponseEntity.ok(savedUser);
        }
        return ResponseEntity.badRequest().build();
    }
    public ResponseEntity<String> deleteUser(int id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            if(loanRepository.findAllByUser(user.get()).isEmpty()) {
                userRepository.deleteById(id);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.badRequest().build();
    }
    public ResponseEntity<User> updateUser(int id, EditUserDTO userDTO) {
        Optional<User> userCheck = userRepository.findUserByUsernameOrEmail(userDTO.getUsername(), userDTO.getEmail());
        if(employeeRepository.findEmployeeByUsernameOrEmail(userDTO.getUsername(), userDTO.getEmail()).isEmpty() && userCheck.isEmpty() || userCheck.get().getUserId().equals(id)) {
            Optional<User> user = userRepository.findById(id);
            if (user.isPresent()) {
                user.get().setFirstName(userDTO.getFirstName());
                user.get().setLastName(userDTO.getLastName());
                user.get().setUsername(userDTO.getUsername());
                user.get().setEmail(userDTO.getEmail());
                user.get().setPhone(userDTO.getPhone());
                User updatedUser = userRepository.save(user.get());
                return ResponseEntity.ok(updatedUser);
            }
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.badRequest().build();
    }
    public ResponseEntity<User> changePassword(int id, String newPassword, Authentication authentication){
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserInfoDetails uid) {
            try {
                if (!userRepository.findUserByUsername(uid.getUsername()).getUserId().equals(id)) {
                    return ResponseEntity.badRequest().build();
                }
            }catch(NullPointerException e){
                if((employeeRepository.findEmployeeByUsername(uid.getUsername()) == null)){
                    return ResponseEntity.badRequest().build();
                }
            }
        }
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            user.get().setPasswordHash(passwordEncoder.encode(newPassword));
            User updatedUser = userRepository.save(user.get());
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.notFound().build();
    }
}
