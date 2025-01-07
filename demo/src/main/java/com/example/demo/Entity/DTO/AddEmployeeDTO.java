package com.example.demo.Entity.DTO;

import com.example.demo.Entity.Employee;
import com.example.demo.Enums.Role;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class AddEmployeeDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private String position;
    private LocalDateTime hireDate;
    private String username;
    private Role role;
    public AddEmployeeDTO(Employee employee) {
        this.firstName = employee.getFirstName();
        this.lastName = employee.getLastName();
        this.email = employee.getEmail();
        this.password = employee.getPasswordHash();
        this.phone = employee.getPhone();
        this.position = employee.getPosition();
        this.hireDate = employee.getHireDate();
        this.username = employee.getUsername();
        this.role = employee.getRole();
    }
}
