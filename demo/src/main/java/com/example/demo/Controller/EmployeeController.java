package com.example.demo.Controller;

import com.example.demo.Entity.DTO.AddEmployeeDTO;
import com.example.demo.Entity.Employee;
import com.example.demo.Service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/me")
    public Employee getEmployee(Authentication authentication){
        return employeeService.getEmployeeByUsername(authentication);
    }
    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable int id){
        return employeeService.getEmployeeById(id);
    }
    @PostMapping("/add")
    public ResponseEntity<Employee> addEmployee(@RequestBody AddEmployeeDTO employee){
        return employeeService.addEmployee(employee);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable int id){
        return employeeService.deleteEmployee(id);
    }
    @PutMapping("/edit/{id}")
    public ResponseEntity<Employee> editEmployee(@PathVariable int id, @RequestBody AddEmployeeDTO employee){
        return employeeService.editEmployee(id, employee);
    }
}
