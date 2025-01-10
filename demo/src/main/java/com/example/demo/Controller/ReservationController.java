package com.example.demo.Controller;

import com.example.demo.Entity.DTO.AddReservationDTO;
import com.example.demo.Entity.DTO.ReservationDTO;
import com.example.demo.Service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    public List<ReservationDTO> getAllReservations(@RequestParam(name="userid", required = false) String userId,
                                                   @RequestParam(name="bookid", required = false) String bookId) {
        if(userId != null && !userId.isEmpty()) {
            return reservationService.getReservationsByUserId(Integer.parseInt(userId));
        }
        if(bookId != null && !bookId.isEmpty()) {
            return reservationService.getReservationsByBookId(Integer.parseInt(bookId));
        }
        return reservationService.getReservations();
    }
    @GetMapping("/{id}")
    public ReservationDTO getReservationById(@PathVariable int id) {
        return reservationService.getReservationById(id);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteReservationById(@PathVariable int id) {
        return reservationService.deleteReservation(id);
    }
    @PostMapping("/add")
    public ResponseEntity<ReservationDTO> addReservation(@RequestBody AddReservationDTO reservationDTO, Authentication authentication) {
        return reservationService.addReservation(reservationDTO, authentication);
    }
    @PutMapping("/edit/{id}")
    public ResponseEntity<ReservationDTO> editReservation(@PathVariable int id, @RequestBody AddReservationDTO reservationDTO) {
        return reservationService.editReservation(id, reservationDTO);
    }
}
