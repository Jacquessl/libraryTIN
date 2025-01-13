package com.example.demo.Controller;

import com.example.demo.Entity.DTO.AddLoanDTO;
import com.example.demo.Entity.DTO.LoanDTO;
import com.example.demo.Service.LoanService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loan")
public class LoanController {

    private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    @GetMapping
    public List<LoanDTO> getLoans(@RequestParam(name = "userid", required = false) String userId,
                                  @RequestParam(name = "employeeid", required = false) String employeeId,
                                  @RequestParam(name = "bookcopyid", required = false) String bookCopyId) {
        if (userId != null && !userId.isEmpty()) {
            try {
                return loanService.getLoansByUserId(Integer.parseInt(userId));
            }catch (NumberFormatException e) {
                e.printStackTrace();
            }
        }
        if (employeeId != null && !employeeId.isEmpty()) {
            try {
                return loanService.getLoansByEmployeeId(Integer.parseInt(employeeId));
            }catch (NumberFormatException e) {
                e.printStackTrace();
            }
        }
        if (bookCopyId != null && !bookCopyId.isEmpty()) {
            try {
                return loanService.getLoansByBookCopyId(Integer.parseInt(bookCopyId));
            }catch (NumberFormatException e) {
                e.printStackTrace();
            }
        }
        return loanService.getLoans();
    }
    @GetMapping("/history")
    public List<LoanDTO> getLoanHistory() {
        return loanService.getLoansHistory();
    }
    @GetMapping("/{id}")
    public LoanDTO getLoan(@PathVariable int id) {
        return loanService.getLoan(id);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteLoan(@PathVariable int id){
        return loanService.deleteLoan(id);
    }
    @PostMapping("/add")
    public ResponseEntity<LoanDTO> addLoan(@RequestBody AddLoanDTO loanDTO, Authentication authentication) {
        return loanService.createLoan(loanDTO, authentication);
    }
    @PutMapping("/edit/{id}")
    public ResponseEntity<LoanDTO> editLoan(@PathVariable int id) {
        return loanService.editLoan(id);
    }
    @PutMapping("/return/{id}")
    public ResponseEntity<LoanDTO> returnLoan(@PathVariable int id){
        return loanService.returnLoan(id);
    }
}
