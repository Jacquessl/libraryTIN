package com.example.demo.Entity.DTO;

import com.example.demo.Entity.Category;
import lombok.Getter;

import java.util.Set;
import java.util.stream.Collectors;

@Getter
public class CategoryDTO {
    private int id;
    private String name;
    private Set<BookDTO> books;
    public CategoryDTO(Category category) {
        this.id = category.getCategoryId();
        this.name = category.getName();
        this.books = category.getBooks().stream().map(BookDTO::new).collect(Collectors.toSet());
    }
}
