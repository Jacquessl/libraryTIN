package com.example.demo.Entity.DTO;

import com.example.demo.Entity.Category;
import lombok.Getter;

import java.util.Set;
import java.util.stream.Collectors;

@Getter
public class AddCategoryDTO {
    private String name;
    private Set<BookDTO> books;
    public AddCategoryDTO(Category category) {
        this.name = category.getName();
        this.books = category.getBooks().stream().map(BookDTO::new).collect(Collectors.toSet());
    }
}
