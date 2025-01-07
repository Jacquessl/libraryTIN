package com.example.demo.Entity.DTO;

import com.example.demo.Entity.BookCopy;
import com.example.demo.Entity.User;
import com.example.demo.Entity.Employee;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class AddLoanDTO {
    private User user;
    private BookCopy bookCopy;
    private LocalDateTime loanDate;
    private LocalDateTime dueDate;
    private LocalDateTime returnDate;
    private Employee employee;
}
