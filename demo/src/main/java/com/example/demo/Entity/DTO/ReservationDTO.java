package com.example.demo.Entity.DTO;

import com.example.demo.Entity.Reservation;
import com.example.demo.Entity.User;
import com.example.demo.Enums.ReservationStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
public class ReservationDTO {

    private Integer id;
    private User user;
    private BookCopyDTO bookCopy;
    private LocalDateTime reservationDate;
    private ReservationStatus status;

    public ReservationDTO(Reservation reservation) {
        this.id = reservation.getReservationId();
        this.user = reservation.getUser();
        this.bookCopy = new BookCopyDTO(reservation.getBookCopy());
        this.reservationDate = reservation.getReservationDate();
        this.status = reservation.getStatus();
    }
}
