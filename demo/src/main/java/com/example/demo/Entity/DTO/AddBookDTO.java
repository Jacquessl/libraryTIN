package com.example.demo.Entity.DTO;

import com.example.demo.Entity.Author;
import com.example.demo.Entity.Book;
import com.example.demo.Entity.Category;
import lombok.Getter;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
public class AddBookDTO {
    private String title;
    private Category category;
    private int publishedYear;
    public String isbn;
    private Set<Integer> authorsIds;

    public AddBookDTO(Book book) {
        this.title = book.getTitle();
        this.category = book.getCategory();
        this.publishedYear = book.getPublishedYear();
        this.isbn = book.getIsbn();
        this.authorsIds = book.getAuthors().stream()
                .map(Author::getAuthorId).collect(Collectors.toSet());
    }
}
