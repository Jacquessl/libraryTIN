package com.example.demo.Entity.DTO;

import com.example.demo.Entity.Reservation;
import com.example.demo.Entity.User;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ReservationDTO {

    private Integer id;
    private User user;
    private BookDTO book;
    private LocalDateTime reservationDate;

    public ReservationDTO(Reservation reservation) {
        this.id = reservation.getReservationId();
        this.user = reservation.getUser();
        this.book = new BookDTO(reservation.getBook());
        this.reservationDate = reservation.getReservationDate();
    }
}
