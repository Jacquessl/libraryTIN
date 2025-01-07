package com.example.demo.Repository;

import com.example.demo.Entity.DTO.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserInfoRepositoryInterface extends JpaRepository<UserInfo, Integer> {
    Optional<UserInfo> findByEmail(String email);
}
