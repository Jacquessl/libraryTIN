package com.example.demo.Service;

import com.example.demo.Config.UserInfoDetails;
import com.example.demo.Entity.DTO.AddEmployeeDTO;
import com.example.demo.Entity.Employee;
import com.example.demo.Repository.EmployeeRepositoryInterface;
import com.example.demo.Repository.UserRepositoryInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepositoryInterface employeeRepository;
    private final UserRepositoryInterface userRepository;

    public EmployeeService(EmployeeRepositoryInterface employeeRepository, UserRepositoryInterface userRepository) {
        this.employeeRepository = employeeRepository;
        this.userRepository = userRepository;
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
    public Employee getEmployeeById(int id){
        return employeeRepository.findById(id).get();
    }
    public Employee getEmployeeByUsername(Authentication authentication) {
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserInfoDetails uid) {
            return employeeRepository.findEmployeeByUsername(uid.getUsername());
        }
        return null;
    }
    public ResponseEntity<Employee> addEmployee(AddEmployeeDTO employee){
        if(userRepository.findUserByUsernameOrEmail(employee.getUsername(), employee.getEmail()).isEmpty() && employeeRepository.findEmployeeByUsernameOrEmail(employee.getUsername(), employee.getEmail()).isEmpty()) {
            Employee employeeToAdd = new Employee();
            employeeToAdd.setFirstName(employee.getFirstName());
            employeeToAdd.setLastName(employee.getLastName());
            employeeToAdd.setPosition(employee.getPosition());
            employeeToAdd.setEmail(employee.getEmail());
            employeeToAdd.setPasswordHash(employee.getPassword());
            employeeToAdd.setRole(employee.getRole());
            employeeToAdd.setHireDate(employee.getHireDate());
            employeeToAdd.setPhone(employee.getPhone());
            employeeToAdd.setUsername(employee.getUsername());
            Employee addedEmployee = employeeRepository.save(employeeToAdd);
            return ResponseEntity.ok(addedEmployee);
        }
        return ResponseEntity.badRequest().build();
    }
    public ResponseEntity<String> deleteEmployee(int id){
        if(employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
            return ResponseEntity.ok("Employee deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }
    public ResponseEntity<Employee> editEmployee(int id, AddEmployeeDTO employeeDTO) {
        if(userRepository.findUserByUsernameOrEmail(employeeDTO.getUsername(), employeeDTO.getEmail()) == null) {

            if (employeeRepository.existsById(id)) {
                Employee employeeToEdit = employeeRepository.findById(id).get();
                employeeToEdit.setFirstName(employeeDTO.getFirstName());
                employeeToEdit.setLastName(employeeDTO.getLastName());
                employeeToEdit.setPosition(employeeDTO.getPosition());
                employeeToEdit.setEmail(employeeDTO.getEmail());
                employeeToEdit.setPasswordHash(employeeDTO.getPassword());
                employeeToEdit.setRole(employeeDTO.getRole());
                employeeToEdit.setHireDate(employeeDTO.getHireDate());
                employeeToEdit.setPhone(employeeDTO.getPhone());
                employeeToEdit.setUsername(employeeDTO.getUsername());
                Employee updatedEmployee = employeeRepository.save(employeeToEdit);
                return ResponseEntity.ok(updatedEmployee);
            }
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.badRequest().build();
    }
}
