package com.example.demo.Repository;

import com.example.demo.Entity.BookCopy;
import com.example.demo.Entity.Employee;
import com.example.demo.Entity.Loan;
import com.example.demo.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanRepositoryInterface extends JpaRepository<Loan, Integer> {
    List<Loan> findAllByUser(User user);
    List<Loan> findAllByEmployee(Employee employee);
    List<Loan> findAllByCopy(BookCopy bookCopy);
}
