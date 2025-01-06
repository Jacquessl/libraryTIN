package com.example.demo.Entity;

import com.example.demo.Enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "employees")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer employeeId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDateTime hireDate;
    private String position;
    private String username;
    @JsonIgnore
    private String password;
    @Column(name = "role", nullable = false, columnDefinition = "ENUM('librarian', 'manager')")
    @Enumerated(EnumType.STRING)
    private Role role;
}
