package com.example.demo.Service;

import com.example.demo.Entity.Book;
import com.example.demo.Entity.DTO.AddReservationDTO;
import com.example.demo.Entity.DTO.ReservationDTO;
import com.example.demo.Entity.Reservation;
import com.example.demo.Entity.User;
import com.example.demo.Repository.BookRepositoryInterface;
import com.example.demo.Repository.ReservationRepositoryInterface;
import com.example.demo.Repository.UserRepositoryInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepositoryInterface reservationRepository;
    private final UserRepositoryInterface userRepository;
    private final BookRepositoryInterface bookRepository;
    public ReservationService(ReservationRepositoryInterface reservationRepository, UserRepositoryInterface userRepository, BookRepositoryInterface bookRepository) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    public List<ReservationDTO> getReservations() {
        return reservationRepository.findAll().stream().map(ReservationDTO::new).collect(Collectors.toList());
    }
    public ReservationDTO getReservationById(int id) {
        return reservationRepository.findById(id).map(ReservationDTO::new).orElse(null);
    }
    public List<ReservationDTO> getReservationsByUserId(int userId) {
        User user = userRepository.findById(userId).orElse(null);
        if(user != null) {
            return reservationRepository.findReservationByUser(user).stream().map(ReservationDTO::new).collect(Collectors.toList());
        }
        return null;
    }
    public List<ReservationDTO> getReservationsByBookId(int bookId) {
        Book book = bookRepository.findById(bookId).orElse(null);
        if(book != null) {
            return reservationRepository.findReservationByBook(book).stream().map(ReservationDTO::new).collect(Collectors.toList());
        }
        return null;
    }
    public ResponseEntity<String> deleteReservation(int id) {
        if(reservationRepository.findById(id).isPresent()) {
            reservationRepository.deleteById(id);
            return ResponseEntity.ok("Reservation deleted");
        }
        return ResponseEntity.notFound().build();
    }
    public ResponseEntity<ReservationDTO> addReservation(AddReservationDTO reservationDTO) {
        Reservation reservation = new Reservation();
        reservation.setUser(reservationDTO.getUser());
        reservation.setBook(reservationDTO.getBook());
        reservation.setReservationDate(reservationDTO.getReservationDate());
        Reservation addedReservation = reservationRepository.save(reservation);
        return ResponseEntity.ok(new ReservationDTO(addedReservation));
    }
    public ResponseEntity<ReservationDTO> editReservation(int id, AddReservationDTO reservationDTO) {
        Reservation reservation = reservationRepository.findById(id).orElse(null);
        if(reservation != null) {
            reservation.setUser(reservationDTO.getUser());
            reservation.setBook(reservationDTO.getBook());
            reservation.setReservationDate(reservationDTO.getReservationDate());
            Reservation updatedReservation = reservationRepository.save(reservation);
            return ResponseEntity.ok(new ReservationDTO(updatedReservation));
        }
        return ResponseEntity.notFound().build();
    }
}
