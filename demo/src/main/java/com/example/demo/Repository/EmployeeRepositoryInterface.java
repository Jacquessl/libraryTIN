package com.example.demo.Repository;

import com.example.demo.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepositoryInterface extends JpaRepository<Employee, Integer> {
    List<Employee> findEmployeesByLastName(String lastName);
    List<Employee> findEmployeesByFirstName(String firstName);
    List<Employee> findEmployeesByPosition(String position);
}
