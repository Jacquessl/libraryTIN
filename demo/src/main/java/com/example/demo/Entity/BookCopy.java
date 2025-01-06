package com.example.demo.Entity;

import com.example.demo.Enums.ConditionStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "book_copies")
public class BookCopy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer copyId;
    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;
    @Column(name = "condition_status", nullable = false, columnDefinition = "ENUM('New', 'Good', 'Worn', 'Damaged')")
    @Enumerated(EnumType.STRING)
    private ConditionStatus conditionStatus;
    private boolean available;
}
