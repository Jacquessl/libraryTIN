package com.example.demo.Repository;

import com.example.demo.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepositoryInterface extends JpaRepository<Employee, Integer> {
    List<Employee> findEmployeesByLastName(String lastName);
    List<Employee> findEmployeesByFirstName(String firstName);
    List<Employee> findEmployeesByPosition(String position);
    Optional<Employee> findEmployeeByUsernameOrEmail(String username, String email);
    Employee findEmployeeByUsername(String username);
}
