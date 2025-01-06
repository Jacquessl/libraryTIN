package com.example.demo.Controller;

import com.example.demo.Entity.Employee;
import com.example.demo.Service.EmployeeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public List<Employee> getAllEmployees(@RequestParam(required = false) String firstName,
                                          @RequestParam(required = false) String lastName,
                                          @RequestParam(required = false) String position) {
        if(firstName != null && !firstName.isEmpty()) {
            return employeeService.getEmployeesByFirstName(firstName);
        }
        if(lastName != null && !lastName.isEmpty()) {
            return employeeService.getEmployeesByLastName(lastName);
        }
        if(position != null && !position.isEmpty()) {
            return employeeService.getEmployeesByPosition(position);
        }
        return employeeService.getAllEmployees();
    }
}
