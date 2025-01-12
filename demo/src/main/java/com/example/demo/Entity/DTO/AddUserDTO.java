package com.example.demo.Entity.DTO;

import lombok.Getter;

@Getter
public class AddUserDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String username;
    private String password;
    //todo editUserDTO || changePasswordUser
}
