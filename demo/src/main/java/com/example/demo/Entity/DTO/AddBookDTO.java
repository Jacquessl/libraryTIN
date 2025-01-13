package com.example.demo.Entity.DTO;

import com.example.demo.Entity.Author;
import com.example.demo.Entity.Book;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.stream.Collectors;

@NoArgsConstructor
@Getter
public class AddBookDTO {
    private String title;
    private Integer categoryId;
    private int publishedYear;
    public String isbn;
    private Set<Integer> authorsIds;

    public AddBookDTO(Book book) {
        this.title = book.getTitle();
        this.categoryId = book.getCategory().getCategoryId();
        this.publishedYear = book.getPublishedYear();
        this.isbn = book.getIsbn();
        this.authorsIds = book.getAuthors().stream()
                .map(Author::getAuthorId).collect(Collectors.toSet());
    }
}
