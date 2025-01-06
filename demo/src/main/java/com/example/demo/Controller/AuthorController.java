package com.example.demo.Controller;

import com.example.demo.Entity.Author;
import com.example.demo.Entity.DTO.AuthorDTO;
import com.example.demo.Repository.AuthorRepositoryInterface;
import com.example.demo.Repository.BookRepositoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController()
@RequestMapping("/api/authors")
public class AuthorController {

    private final AuthorRepositoryInterface authorRepository;
    private final BookRepositoryInterface bookRepository;

    @Autowired
    public AuthorController(AuthorRepositoryInterface authorRepository, BookRepositoryInterface bookRepository) {
        this.authorRepository = authorRepository;
        this.bookRepository = bookRepository;
    }

    @GetMapping()
    public List<AuthorDTO> getAllAuthors() {
        return authorRepository.findAll().stream().map(AuthorDTO::new).collect(Collectors.toList());
    }
    @GetMapping("/{id}")
    public Optional<AuthorDTO> getAuthorById(@PathVariable int id) {
        return authorRepository.findById(id)
                .map(AuthorDTO::new);
    }
    @PostMapping("/add")
    public ResponseEntity<Author> addAuthor(@RequestBody AuthorDTO authorDTO) {
        Author newAuthor = new Author();
        newAuthor.setFirstName(authorDTO.getFirstName());
        newAuthor.setLastName(authorDTO.getLastName());
        newAuthor.setBooks(authorDTO.getBookTitles().stream().map(bookRepository::findBookByTitle).collect(Collectors.toSet()));

        Author savedAuthor = authorRepository.save(newAuthor);
        return ResponseEntity.ok(savedAuthor);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteAuthor(@PathVariable int id) {
        authorRepository.deleteById(id);
    }
    @PutMapping("/edit/{id}")
    public ResponseEntity<Author> updateAuthor(@PathVariable int id, @RequestBody AuthorDTO authorDTO) {
        Optional<Author> author = authorRepository.findById(id);
        if (author.isPresent()) {
            author.get().setFirstName(authorDTO.getFirstName());
            author.get().setLastName(authorDTO.getLastName());
            author.get().setBooks(authorDTO.getBookTitles().stream().map(bookRepository::findBookByTitle).collect(Collectors.toSet()));
            Author savedAuthor = authorRepository.save(author.get());
            return ResponseEntity.ok(savedAuthor);
        }
        return ResponseEntity.notFound().build();
    }
}
