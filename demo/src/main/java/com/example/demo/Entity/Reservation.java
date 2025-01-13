package com.example.demo.Entity;

import com.example.demo.Enums.ReservationStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reservationId;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @ManyToOne
    @JoinColumn(name = "copy_id", nullable = false)
    private BookCopy bookCopy;
    private LocalDateTime reservationDate;
    @Column(name = "status", nullable = false, columnDefinition = "ENUM('Pending', 'Cancelled', 'Completed')")
    @Enumerated(EnumType.STRING)
    private ReservationStatus status;
}
