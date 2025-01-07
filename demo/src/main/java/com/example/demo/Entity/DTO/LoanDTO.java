package com.example.demo.Entity.DTO;

import com.example.demo.Entity.Loan;
import com.example.demo.Entity.User;
import com.example.demo.Entity.Employee;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class LoanDTO {

    private Integer id;
    private User user;
    private BookCopyDTO bookCopy;
    private LocalDateTime loanDate;
    private LocalDateTime dueDate;
    private LocalDateTime returnDate;
    private Employee Employee;
    public LoanDTO(Loan loan) {
        this.id = loan.getLoanId();
        this.user = loan.getUser();
        this.bookCopy = new BookCopyDTO(loan.getCopy());
        this.loanDate = loan.getLoanDate();
        this.dueDate = loan.getDueDate();
        this.returnDate = loan.getReturnDate();
        this.Employee = loan.getEmployee();
    }
}
