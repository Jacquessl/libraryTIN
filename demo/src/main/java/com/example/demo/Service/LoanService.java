package com.example.demo.Service;

import com.example.demo.Config.UserInfoDetails;
import com.example.demo.Entity.*;
import com.example.demo.Entity.DTO.AddLoanDTO;
import com.example.demo.Entity.DTO.LoanDTO;
import com.example.demo.Enums.ReservationStatus;
import com.example.demo.Repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LoanService {

    private final LoanRepositoryInterface loanRepository;
    private final UserRepositoryInterface userRepository;
    private final BookCopyRepositoryInterface bookCopyRepository;
    private final EmployeeRepositoryInterface employeeRepositoryInterface;
    private final ReservationRepositoryInterface reservationRepository;

    public LoanService(LoanRepositoryInterface loanRepository, UserRepositoryInterface userRepository,
                       BookCopyRepositoryInterface bookCopyRepository,
                       EmployeeRepositoryInterface employeeRepositoryInterface,
                       ReservationRepositoryInterface reservationRepository) {
        this.loanRepository = loanRepository;
        this.userRepository = userRepository;
        this.bookCopyRepository = bookCopyRepository;
        this.employeeRepositoryInterface = employeeRepositoryInterface;
        this.reservationRepository = reservationRepository;
    }

    public List<LoanDTO> getLoans(){
        return loanRepository.findAll().stream().map(LoanDTO::new).filter((loan)->loan.getReturnDate()==null).collect(Collectors.toList());
    }
    public LoanDTO getLoan(int id) {
        return loanRepository.findById(id).map(LoanDTO::new).orElse(null);
    }
    public List<LoanDTO> getLoansByUserId(int userId) {
        User user = userRepository.findById(userId).orElse(null);
        return loanRepository.findAllByUser(user).stream().map(LoanDTO::new).filter((loan)->loan.getReturnDate()==null).collect(Collectors.toList());
    }
    public List<LoanDTO> getLoansByEmployeeId(int employeeId) {
        Employee employee = employeeRepositoryInterface.findById(employeeId).orElse(null);
        return loanRepository.findAllByEmployee(employee).stream().map(LoanDTO::new).filter((loan)->loan.getReturnDate()==null).collect(Collectors.toList());
    }
    public List<LoanDTO> getLoansByBookCopyId(int bookCopyId) {
        BookCopy bookCopy = bookCopyRepository.findById(bookCopyId).orElse(null);
        return loanRepository.findAllByCopy(bookCopy).stream().map(LoanDTO::new).filter((loan)->loan.getReturnDate()==null).collect(Collectors.toList());
    }
    public List<LoanDTO> getLoansHistory(){
        return loanRepository.findAll().stream().map(LoanDTO::new).filter((loan)->!(loan.getReturnDate()==null)).collect(Collectors.toList());
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
    public ResponseEntity<LoanDTO> createLoan(AddLoanDTO addLoanDTO, Authentication authentication){
        Loan loan = new Loan();
        loan.setUser(userRepository.findById(addLoanDTO.getUserId()).orElse(null));
        loan.setCopy(bookCopyRepository.findById(addLoanDTO.getBookCopyId()).orElse(null));
        loan.setLoanDate(LocalDateTime.now());
        loan.setDueDate(LocalDateTime.now().plusDays(14));
        loan.setReturnDate(null);
        Object principal = authentication.getPrincipal();
        Employee employee = null;
        if (principal instanceof UserInfoDetails uid) {
            employee = employeeRepositoryInterface.findEmployeeByUsername(uid.getUsername());
        }
        loan.setEmployee(employee);
        Loan addedLoan = loanRepository.save(loan);
        Optional<Reservation> reservation = reservationRepository.findById(addLoanDTO.getReservationId());
        if(reservation.isPresent()) {
            reservation.get().setStatus(ReservationStatus.Completed);
            reservationRepository.save(reservation.get());
            return ResponseEntity.ok(new LoanDTO(addedLoan));
        }
        return ResponseEntity.status(500).build();

    }
    public ResponseEntity<LoanDTO> editLoan(int id) {
        Loan loan = loanRepository.findById(id).orElse(null);
        if(loan != null){
            loan.setDueDate(loan.getDueDate().plusDays(14));
            Loan updatedLoan = loanRepository.save(loan);
            return ResponseEntity.ok(new LoanDTO(updatedLoan));
        }
        return ResponseEntity.notFound().build();
    }
    public ResponseEntity<LoanDTO> returnLoan(int id) {
        Loan loan = loanRepository.findById(id).orElse(null);
        if(loan != null){
            loan.setReturnDate(LocalDateTime.now());
            BookCopy book = loan.getCopy();
            book.setAvailable(true);
            bookCopyRepository.save(book);
            Loan updatedLoan = loanRepository.save(loan);
            return ResponseEntity.ok(new LoanDTO(updatedLoan));
        }
        return ResponseEntity.notFound().build();
    }
}
