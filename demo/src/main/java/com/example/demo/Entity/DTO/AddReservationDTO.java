package com.example.demo.Entity.DTO;

import com.example.demo.Entity.Book;
import com.example.demo.Entity.User;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class AddReservationDTO {
    private User user;
    private Book book;
    private LocalDateTime reservationDate;
}
