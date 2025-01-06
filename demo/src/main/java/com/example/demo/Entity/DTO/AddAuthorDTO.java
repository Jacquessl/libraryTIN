package com.example.demo.Entity.DTO;

import com.example.demo.Entity.Author;
import com.example.demo.Entity.Book;
import lombok.Getter;

import java.util.Set;
import java.util.stream.Collectors;

@Getter
public class AddAuthorDTO {
    private String firstName;
    private String lastName;
    private Set<String> bookTitles;

    public AddAuthorDTO(Author author) {
        this.firstName = author.getFirstName();
        this.lastName = author.getLastName();
        this.bookTitles = author.getBooks().stream()
                .map(Book::getTitle)
                .collect(Collectors.toSet());
    }
}