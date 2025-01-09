package com.example.demo.Repository;

import com.example.demo.Entity.Book;
import com.example.demo.Entity.BookCopy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookCopyRepositoryInterface extends JpaRepository<BookCopy, Integer> {
    List<BookCopy> findByBook(Book book);
    List<BookCopy> findByAvailable(boolean available);
    BookCopy findByCopyId(int copyId);
}
