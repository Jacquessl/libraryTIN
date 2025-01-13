package com.example.demo.Service;

import com.example.demo.Config.UserInfoDetails;
import com.example.demo.Entity.DTO.AddEmployeeDTO;
import com.example.demo.Entity.DTO.ChangePassword;
import com.example.demo.Entity.DTO.EditEmployeeDTO;
import com.example.demo.Entity.Employee;
import com.example.demo.Enums.Role;
import com.example.demo.Repository.EmployeeRepositoryInterface;
import com.example.demo.Repository.UserRepositoryInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepositoryInterface employeeRepository;
    private final UserRepositoryInterface userRepository;
    private final PasswordEncoder passwordEncoder;

    public EmployeeService(EmployeeRepositoryInterface employeeRepository, UserRepositoryInterface userRepository, PasswordEncoder passwordEncoder) {
        this.employeeRepository = employeeRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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
            if(employee.getPosition().toLowerCase().equals("librarian")) {
                employeeToAdd.setRole(Role.librarian);
            }else{
                employeeToAdd.setRole(Role.manager);
            }
            employeeToAdd.setHireDate(LocalDateTime.now());
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
    public ResponseEntity<Employee> editEmployee(int id, EditEmployeeDTO employeeDTO) {
        if(userRepository.findUserByUsernameOrEmail(employeeDTO.getUsername(), employeeDTO.getEmail()).isEmpty() && employeeRepository.findEmployeeByUsernameOrEmail(employeeDTO.getUsername(), employeeDTO.getEmail()).isEmpty()) {

            if (employeeRepository.existsById(id)) {
                Employee employeeToEdit = employeeRepository.findById(id).get();
                employeeToEdit.setFirstName(employeeDTO.getFirstName());
                employeeToEdit.setLastName(employeeDTO.getLastName());
                employeeToEdit.setPosition(employeeDTO.getPosition());
                employeeToEdit.setEmail(employeeDTO.getEmail());
                if(employeeDTO.getPosition().toLowerCase().equals("librarian")) {
                    employeeToEdit.setRole(Role.librarian);
                }else{
                    employeeToEdit.setRole(Role.manager);
                }
                employeeToEdit.setPhone(employeeDTO.getPhone());
                employeeToEdit.setUsername(employeeDTO.getUsername());
                Employee updatedEmployee = employeeRepository.save(employeeToEdit);
                return ResponseEntity.ok(updatedEmployee);
            }
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.badRequest().build();
    }
    public ResponseEntity<Employee> changePassword(int id, ChangePassword newPassword, Authentication authentication){
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserInfoDetails uid) {
            try {
                if((!employeeRepository.findEmployeeByUsername(uid.getUsername()).getPosition().toLowerCase().equals("manager")) && !employeeRepository.findEmployeeByUsername(uid.getUsername()).getEmployeeId().equals(id)){
                    return ResponseEntity.status(500).build();
                }
            }catch(NullPointerException e){
                return ResponseEntity.ok().build();
            }
        }
        Optional<Employee> employee = employeeRepository.findById(id);
        if (employee.isPresent()) {
            employee.get().setPasswordHash(passwordEncoder.encode(newPassword.getNewPassword()));
            Employee updatedEmployee = employeeRepository.save(employee.get());
            return ResponseEntity.ok(updatedEmployee);
        }
        return ResponseEntity.notFound().build();
    }
}
