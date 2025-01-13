package com.example.demo.Repository;

import com.example.demo.Entity.Author;
import com.example.demo.Entity.Book;
import com.example.demo.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepositoryInterface extends JpaRepository<Book, Integer> {
    Book findBookByTitle(String title);
    Optional<Book> findByIsbn(String isbn);
    List<Book> findByAuthorsContaining(Author author);
    List<Book> findBooksByCategory(Category category);
    List<Book> findBooksByTitleContaining(String title);
}
