package com.example.demo.Repository;

import com.example.demo.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepositoryInterface extends JpaRepository<User, Integer> {
    List<User> findUsersByFirstName(String firstName);
    List<User> findUsersByLastName(String lastName);
    List<User> findUsersByUsernameContaining(String username);
    Optional<User> findUserByUsernameOrEmail(String username, String email);
    User findUserByUsername(String username);
}
