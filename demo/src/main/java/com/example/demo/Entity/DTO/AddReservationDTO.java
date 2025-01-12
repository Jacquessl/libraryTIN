package com.example.demo.Entity.DTO;

import com.example.demo.Entity.Book;
import com.example.demo.Entity.BookCopy;
import com.example.demo.Entity.User;
import com.example.demo.Enums.ReservationStatus;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class AddReservationDTO {
    private BookCopyDTO bookCopy;
}
