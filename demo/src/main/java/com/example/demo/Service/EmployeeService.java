package com.example.demo.Service;

import com.example.demo.Entity.Employee;
import com.example.demo.Repository.EmployeeRepositoryInterface;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepositoryInterface employeeRepository;

    public EmployeeService(EmployeeRepositoryInterface employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
    public List<Employee> getEmployeesByFirstName(String firstName){
        return employeeRepository.findEmployeesByFirstName(firstName);
    }
    public List<Employee> getEmployeesByLastName(String lastName){
        return employeeRepository.findEmployeesByLastName(lastName);
    }
    public List<Employee> getEmployeesByPosition(String position){
        return employeeRepository.findEmployeesByPosition(position);
    }
}
