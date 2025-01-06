package com.example.demo.Controller;

import com.example.demo.Entity.Author;
import com.example.demo.Entity.Book;
import com.example.demo.Entity.Category;
import com.example.demo.Entity.DTO.AddBookDTO;
import com.example.demo.Entity.DTO.BookDTO;
import com.example.demo.Repository.AuthorRepositoryInterface;
import com.example.demo.Repository.BookRepositoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookRepositoryInterface bookRepository;
    private final AuthorRepositoryInterface authorRepository;

    @Autowired
    public BookController(BookRepositoryInterface bookRepository, AuthorRepositoryInterface authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }

    @GetMapping
    public List<BookDTO> getBooks(){
        return bookRepository.findAll().stream().map(BookDTO::new).collect(Collectors.toList());
    }
    @GetMapping("/{id}")
    public BookDTO getBook(@PathVariable int id){
        return bookRepository.findById(id).map(BookDTO::new).orElse(null);
    }
    @GetMapping("/{isbn}")
    public BookDTO getBookByISBN(@PathVariable String isbn){
        return bookRepository.findByIsbn(isbn).map(BookDTO::new).orElse(null);
    }
    @GetMapping("/category")
    public List<BookDTO> getBooksByCategory(@RequestParam Category category){
        return bookRepository.findBooksByCategory(category).stream().map(BookDTO::new).collect(Collectors.toList());
    }
    @GetMapping("/author")
    public List<BookDTO> getBooksByAuthor(@RequestParam Author author){
        return bookRepository.findByAuthorsContaining(author).stream().map(BookDTO::new).collect(Collectors.toList());
    }
    @GetMapping("/{title}")
    public List<BookDTO> getBooksByTitle(@PathVariable String title){
        return bookRepository.findBooksByTitleContaining(title).stream().map(BookDTO::new).collect(Collectors.toList());
    }
    @PostMapping("/add")
    public ResponseEntity<BookDTO> addBook(@RequestBody AddBookDTO bookDTO){
        Book newBook = new Book();
        newBook.setTitle(bookDTO.getTitle());
        newBook.setCategory(bookDTO.getCategory());
        newBook.setPublishedYear(bookDTO.getPublishedYear());
        newBook.setIsbn(bookDTO.getIsbn());
        newBook.setAuthors(bookDTO.getAuthorsIds().stream().map(authorRepository::findByAuthorId).collect(Collectors.toSet()));
        Book savedBook = bookRepository.save(newBook);
        return ResponseEntity.ok(new BookDTO(savedBook));
    }
    @DeleteMapping("/delete/{id}")
    public void deleteBook(@PathVariable int id){
        bookRepository.deleteById(id);
    }
    @PutMapping("/edit/{id}")
    public ResponseEntity<BookDTO> updateBook(@PathVariable int id, @RequestBody AddBookDTO bookDTO){
        Optional<Book> book = bookRepository.findById(id);
        if(book.isPresent()){
            book.get().setTitle(bookDTO.getTitle());
            book.get().setCategory(bookDTO.getCategory());
            book.get().setPublishedYear(bookDTO.getPublishedYear());
            book.get().setIsbn(bookDTO.getIsbn());
            book.get().setAuthors(bookDTO.getAuthorsIds().stream().map(authorRepository::findByAuthorId).collect(Collectors.toSet()));
            Book savedBook = bookRepository.save(book.get());
            return ResponseEntity.ok(new BookDTO(savedBook));
        }
        return ResponseEntity.notFound().build();
    }
}
