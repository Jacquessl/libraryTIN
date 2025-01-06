package com.example.demo.Entity.DTO;

import com.example.demo.Entity.Book;
import lombok.Getter;

import java.util.Set;
import java.util.stream.Collectors;

@Getter
public class BookDTO {

    private int id;
    private String title;
    private String category;
    private int publishedYear;
    private String isbn;
    private Set<String> authors;

    public BookDTO(Book book){
        this.id = book.getBookId();
        this.title = book.getTitle();
        this.category = book.getCategory().getName();
        this.publishedYear = book.getPublishedYear();
        this.isbn = book.getIsbn();
        this.authors = book.getAuthors().stream()
                .map((e) -> e.getFirstName() + " " + e.getLastName()).collect(Collectors.toSet());
    }
}
