package com.example.demo.Service;

import com.example.demo.Entity.BookCopy;
import com.example.demo.Entity.DTO.AddLoanDTO;
import com.example.demo.Entity.DTO.LoanDTO;
import com.example.demo.Entity.Employee;
import com.example.demo.Entity.Loan;
import com.example.demo.Entity.User;
import com.example.demo.Repository.BookCopyRepositoryInterface;
import com.example.demo.Repository.EmployeeRepositoryInterface;
import com.example.demo.Repository.LoanRepositoryInterface;
import com.example.demo.Repository.UserRepositoryInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoanService {

    private final LoanRepositoryInterface loanRepository;
    private final UserRepositoryInterface userRepository;
    private final BookCopyRepositoryInterface bookCopyRepository;
    private final EmployeeRepositoryInterface employeeRepositoryInterface;

    public LoanService(LoanRepositoryInterface loanRepository, UserRepositoryInterface userRepository, BookCopyRepositoryInterface bookCopyRepository, EmployeeRepositoryInterface employeeRepositoryInterface) {
        this.loanRepository = loanRepository;
        this.userRepository = userRepository;
        this.bookCopyRepository = bookCopyRepository;
        this.employeeRepositoryInterface = employeeRepositoryInterface;
    }

    public List<LoanDTO> getLoans(){
        return loanRepository.findAll().stream().map(LoanDTO::new).collect(Collectors.toList());
    }
    public LoanDTO getLoan(int id) {
        return loanRepository.findById(id).map(LoanDTO::new).orElse(null);
    }
    public List<LoanDTO> getLoansByUserId(int userId) {
        User user = userRepository.findById(userId).orElse(null);
        return loanRepository.findAllByUser(user).stream().map(LoanDTO::new).collect(Collectors.toList());
    }
    public List<LoanDTO> getLoansByEmployeeId(int employeeId) {
        Employee employee = employeeRepositoryInterface.findById(employeeId).orElse(null);
        return loanRepository.findAllByEmployee(employee).stream().map(LoanDTO::new).collect(Collectors.toList());
    }
    public List<LoanDTO> getLoansByBookCopyId(int bookCopyId) {
        BookCopy bookCopy = bookCopyRepository.findById(bookCopyId).orElse(null);
        return loanRepository.findAllByCopy(bookCopy).stream().map(LoanDTO::new).collect(Collectors.toList());
    }
    public ResponseEntity<String> deleteLoan(int id){
        Loan loan = loanRepository.findById(id).orElse(null);
        if(loan != null){
            if(loan.getDueDate() != null) {
                loanRepository.deleteById(id);
                return ResponseEntity.ok("Loan deleted");
            }
            return ResponseEntity.status(500).body("Loan not returned");
        }
        return ResponseEntity.status(404).body("Loan not found");
    }
    public ResponseEntity<LoanDTO> createLoan(AddLoanDTO loanDTO){
        Loan loan = new Loan();
        loan.setUser(loanDTO.getUser());
        loan.setCopy(loanDTO.getBookCopy());
        loan.setLoanDate(loanDTO.getLoanDate());
        loan.setDueDate(loanDTO.getDueDate());
        loan.setReturnDate(loanDTO.getReturnDate());
        loan.setEmployee(loanDTO.getEmployee());
        Loan addedLoan = loanRepository.save(loan);
        return ResponseEntity.ok(new LoanDTO(addedLoan));
    }
    public ResponseEntity<LoanDTO> editLoan(int id, AddLoanDTO loanDTO) {
        Loan loan = loanRepository.findById(id).orElse(null);
        if(loan != null){
            loan.setUser(loanDTO.getUser());
            loan.setCopy(loanDTO.getBookCopy());
            loan.setLoanDate(loanDTO.getLoanDate());
            loan.setDueDate(loanDTO.getDueDate());
            loan.setReturnDate(loanDTO.getReturnDate());
            loan.setEmployee(loanDTO.getEmployee());
            Loan updatedLoan = loanRepository.save(loan);
            return ResponseEntity.ok(new LoanDTO(updatedLoan));
        }
        return ResponseEntity.notFound().build();
    }
}
