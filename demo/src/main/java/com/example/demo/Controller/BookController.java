package com.example.demo.Controller;

import com.example.demo.Entity.Author;
import com.example.demo.Entity.Category;
import com.example.demo.Entity.DTO.AddBookDTO;
import com.example.demo.Entity.DTO.BookDTO;
import com.example.demo.Service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<BookDTO> getBooks(@RequestParam(required = false) String isbn, @RequestParam(required = false) String title){
        if (title != null && !title.isEmpty()) {
            return bookService.getBooksByTitle(title);
        }
        if (isbn != null && !isbn.isEmpty()) {
            return bookService.getBookByISBN(isbn);
        }
        return bookService.getAllBooks();
    }
    @GetMapping("/{id}")
    public BookDTO getBook(@PathVariable int id){
        return bookService.getBookById(id);
    }
    @GetMapping("/category")
    public List<BookDTO> getBooksByCategory(@RequestBody Category category){
        return bookService.getBooksByCategory(category);
    }
    @GetMapping("/author")
    public List<BookDTO> getBooksByAuthor(@RequestBody Author author){
        return bookService.getBooksByAuthor(author);
    }
    @PostMapping("/add")
    public ResponseEntity<BookDTO> addBook(@RequestBody AddBookDTO bookDTO){
        return ResponseEntity.ok(bookService.addBook(bookDTO));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable int id){
        return bookService.deleteBook(id);
    }
    @PutMapping("/edit/{id}")
    public ResponseEntity<BookDTO> updateBook(@PathVariable int id, @RequestBody AddBookDTO bookDTO){
        return ResponseEntity.ok(bookService.updateBook(id, bookDTO));
    }

}
