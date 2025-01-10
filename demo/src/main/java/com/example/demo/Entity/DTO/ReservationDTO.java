package com.example.demo.Entity.DTO;

import com.example.demo.Entity.Reservation;
import com.example.demo.Entity.User;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ReservationDTO {

    private Integer id;
    private User user;
    private BookCopyDTO bookCopy;
    private LocalDateTime reservationDate;

    public ReservationDTO(Reservation reservation) {
        this.id = reservation.getReservationId();
        this.user = reservation.getUser();
        this.bookCopy = new BookCopyDTO(reservation.getBookCopy());
        this.reservationDate = reservation.getReservationDate();
    }
}
