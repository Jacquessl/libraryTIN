package com.example.demo.Service;

import com.example.demo.Entity.DTO.AddUserDTO;
import com.example.demo.Entity.User;
import com.example.demo.Repository.EmployeeRepositoryInterface;
import com.example.demo.Repository.UserRepositoryInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepositoryInterface userRepository;
    private final EmployeeRepositoryInterface employeeRepository;

    public UserService(UserRepositoryInterface userRepository, PasswordEncoder passwordEncoder, EmployeeRepositoryInterface employeeRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.employeeRepository = employeeRepository;
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
    public List<User> getUserByUsername(String username) {
        return userRepository.findUsersByUsernameContaining(username);
    }
    public ResponseEntity<User> addUser(AddUserDTO userDTO) {
        if(employeeRepository.findEmployeeByUsernameOrEmail(userDTO.getUsername(), userDTO.getEmail()) == null) {
            User user = new User();
            user.setFirstName(userDTO.getFirstName());
            user.setLastName(userDTO.getLastName());
            user.setUsername(userDTO.getUsername());
            user.setPasswordHash(passwordEncoder.encode(userDTO.getPassword()));
            user.setEmail(userDTO.getEmail());
            user.setPhone(userDTO.getPhone());
            User savedUser = userRepository.save(user);
            return ResponseEntity.ok(savedUser);
        }
        return ResponseEntity.badRequest().build();
    }
    public ResponseEntity<String> deleteUser(int id) {
        //TODO if statement for checking active user loans
        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }
    public ResponseEntity<User> updateUser(int id, AddUserDTO userDTO) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            user.get().setFirstName(userDTO.getFirstName());
            user.get().setLastName(userDTO.getLastName());
            user.get().setUsername(userDTO.getUsername());
            user.get().setPasswordHash(passwordEncoder.encode(userDTO.getPassword()));
            user.get().setEmail(userDTO.getEmail());
            user.get().setPhone(userDTO.getPhone());
            User updatedUser = userRepository.save(user.get());
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.notFound().build();
    }
}
