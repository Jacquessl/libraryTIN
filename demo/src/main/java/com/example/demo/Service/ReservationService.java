package com.example.demo.Service;

import com.example.demo.Config.UserInfoDetails;
import com.example.demo.Entity.Book;
import com.example.demo.Entity.BookCopy;
import com.example.demo.Entity.DTO.AddReservationDTO;
import com.example.demo.Entity.DTO.ReservationDTO;
import com.example.demo.Entity.Reservation;
import com.example.demo.Entity.User;
import com.example.demo.Enums.ReservationStatus;
import com.example.demo.Repository.BookCopyRepositoryInterface;
import com.example.demo.Repository.BookRepositoryInterface;
import com.example.demo.Repository.ReservationRepositoryInterface;
import com.example.demo.Repository.UserRepositoryInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepositoryInterface reservationRepository;
    private final UserRepositoryInterface userRepository;
    private final BookRepositoryInterface bookRepository;
    private final BookCopyRepositoryInterface bookCopyRepositoryInterface;

    public ReservationService(ReservationRepositoryInterface reservationRepository, UserRepositoryInterface userRepository, BookRepositoryInterface bookRepository, BookCopyRepositoryInterface bookCopyRepositoryInterface) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.bookCopyRepositoryInterface = bookCopyRepositoryInterface;
    }

    public List<ReservationDTO> getReservations() {
        return reservationRepository.findAll().stream().map(ReservationDTO::new).filter((reservation)-> reservation.getStatus().equals(ReservationStatus.Pending)).collect(Collectors.toList());
    }
    public List<ReservationDTO> getHistoryReservations() {
        return reservationRepository.findAll().stream().map(ReservationDTO::new).filter((reservation)->
                !reservation.getStatus().equals(ReservationStatus.Pending)).collect(Collectors.toList());
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
        List<BookCopy> bookCopies = bookCopyRepositoryInterface.findByBook(book);
        if(book != null) {
            return bookCopies.stream()
                    .flatMap(bookCopy -> reservationRepository.findReservationByBookCopy(bookCopy)
                            .stream()
                            .map(ReservationDTO::new))
                    .collect(Collectors.toList());        }
        return null;
    }
    public ResponseEntity<String> deleteReservation(int id) {
        if(reservationRepository.findById(id).isPresent()) {
            reservationRepository.deleteById(id);
            return ResponseEntity.ok("Reservation deleted");
        }
        return ResponseEntity.notFound().build();
    }
    public ResponseEntity<ReservationDTO> addReservation(AddReservationDTO reservationDTO, Authentication authentication) {
        Object principal = authentication.getPrincipal();
        User user = null;
        if (principal instanceof UserInfoDetails uid) {
            user = userRepository.findUserByUsername(uid.getUsername());
        }
        if(user != null) {
            BookCopy book = bookCopyRepositoryInterface.findByCopyId(reservationDTO.getBookCopy().getCopyId());
            Reservation reservation = new Reservation();
            reservation.setUser(user);
            reservation.setBookCopy(bookCopyRepositoryInterface.findByCopyId(reservationDTO.getBookCopy().getCopyId()));
            reservation.setReservationDate(LocalDateTime.now());
            reservation.setStatus(ReservationStatus.Pending);
            Reservation addedReservation = reservationRepository.save(reservation);
            book.setAvailable(false);
            bookCopyRepositoryInterface.save(book);
            return ResponseEntity.ok(new ReservationDTO(addedReservation));
        }
        return ResponseEntity.notFound().build();
    }
    public ResponseEntity<ReservationDTO> editReservation(int id, ReservationStatus status) {
        Reservation reservation = reservationRepository.findById(id).orElse(null);
        if(reservation != null) {
            reservation.setStatus(status);
            if(status.equals(ReservationStatus.Cancelled)){
                BookCopy book = bookCopyRepositoryInterface.findByCopyId(reservation.getBookCopy().getCopyId());
                book.setAvailable(true);
                bookCopyRepositoryInterface.save(book);
            }
            Reservation updatedReservation = reservationRepository.save(reservation);
            return ResponseEntity.ok(new ReservationDTO(updatedReservation));
        }
        return ResponseEntity.notFound().build();
    }
}
