package com.example.demo.Repository;

import com.example.demo.Entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorRepositoryInterface extends JpaRepository<Author, Integer> {
    List<Author> findByFirstName(String firstName);
    Author findByAuthorId(Integer authorId);
    Author findAuthorByFirstNameAndLastName(String firstName, String lastName);
}
