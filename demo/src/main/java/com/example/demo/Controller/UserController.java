package com.example.demo.Controller;

import com.example.demo.Entity.DTO.AddUserDTO;
import com.example.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Entity.User;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers(@RequestParam(required = false) String firstName,
                               @RequestParam(required = false) String lastName,
                               @RequestParam(required = false) String username){
        if(firstName != null && !firstName.isEmpty()){
            return userService.getUserByFirstName(firstName);
        }
        if(lastName != null && !lastName.isEmpty()){
            return userService.getUserByLastName(lastName);
        }
        if(username != null && !username.isEmpty()){
            return userService.getUserByUsername(username);
        }
        return userService.getAllUsers();
    }
    @GetMapping("/{id}")
    public User getUser(@PathVariable int id){
        return userService.getUserById(id);
    }
    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody AddUserDTO user){
        //todo nie moze byc taki sam username dla employee i user
        return userService.addUser(user);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id){
        return userService.deleteUser(id);
    }
    @PutMapping("/edit/{id}")
    public ResponseEntity<User> editUser(@PathVariable int id, @RequestBody AddUserDTO user){
        return userService.updateUser(id, user);
    }
}
