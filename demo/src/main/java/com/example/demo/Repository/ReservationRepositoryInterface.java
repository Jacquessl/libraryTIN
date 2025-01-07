package com.example.demo.Repository;

import com.example.demo.Entity.Book;
import com.example.demo.Entity.Reservation;
import com.example.demo.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepositoryInterface extends JpaRepository<Reservation, Integer> {
    List<Reservation> findReservationByUser(User user);
    List<Reservation> findReservationByBook(Book book);
}
