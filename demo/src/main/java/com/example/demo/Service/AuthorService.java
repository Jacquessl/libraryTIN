package com.example.demo.Service;

import com.example.demo.Entity.Author;
import com.example.demo.Entity.DTO.AddAuthorDTO;
import com.example.demo.Entity.DTO.AuthorDTO;
import com.example.demo.Repository.AuthorRepositoryInterface;
import com.example.demo.Repository.BookRepositoryInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AuthorService {

    private final AuthorRepositoryInterface authorRepository;
    private final BookRepositoryInterface bookRepository;

    public AuthorService(AuthorRepositoryInterface authorRepository, BookRepositoryInterface bookRepository) {
        this.authorRepository = authorRepository;
        this.bookRepository = bookRepository;
    }
    public List<AuthorDTO> getAllAuthors() {

        return authorRepository.findAll().stream().map(AuthorDTO::new).collect(Collectors.toList());
    }
    public AuthorDTO getAuthorById(int id) {
        return authorRepository.findById(id).map(AuthorDTO::new).orElse(null);
    }
    public AuthorDTO addAuthor(AddAuthorDTO authorDTO) {
        Author newAuthor = new Author();
        newAuthor.setFirstName(authorDTO.getFirstName());
        newAuthor.setLastName(authorDTO.getLastName());
        newAuthor.setBooks(new HashSet<>());
        Author addedAuthor = authorRepository.save(newAuthor);

        return new AuthorDTO(addedAuthor);
    }
    public AuthorDTO updateAuthor(int id, AddAuthorDTO authorDTO) {
        Optional<Author> author = authorRepository.findById(id);
        if (author.isPresent()) {
            author.get().setFirstName(authorDTO.getFirstName());
            author.get().setLastName(authorDTO.getLastName());
            Author addedAuthor = authorRepository.save(author.get());
            return new AuthorDTO(addedAuthor);
        }
        return null;
    }
    public ResponseEntity<String> deleteAuthor(int id) {
        if (bookRepository.findByAuthorsContaining(authorRepository.findByAuthorId(id)).isEmpty()) {
            authorRepository.deleteById(id);
            return ResponseEntity.ok("Delete Success");
        }
        return ResponseEntity.status(500).body("Delete Failed");
    }
}
