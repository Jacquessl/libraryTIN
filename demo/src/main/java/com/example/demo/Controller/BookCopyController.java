package com.example.demo.Controller;

import com.example.demo.Entity.Author;
import com.example.demo.Entity.Category;
import com.example.demo.Entity.DTO.BookCopyDTO;
import com.example.demo.Entity.DTO.AddBookCopyDTO;
import com.example.demo.Entity.DTO.BookDTO;
import com.example.demo.Service.BookCopyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookcopy")
public class BookCopyController {

    private final BookCopyService bookCopyService;

    public BookCopyController(BookCopyService bookCopyService) {
        this.bookCopyService = bookCopyService;
    }

    @GetMapping
    public List<BookCopyDTO> bookCopy(@RequestParam(required = false) String isbn, @RequestParam(required = false) String title) {
        if(title != null && !title.isEmpty()) {
            return bookCopyService.getAllCopiesByTitle(title);
        }
        if(isbn != null && !isbn.isEmpty()) {
            return bookCopyService.getAllCopiesByISBN(isbn);
        }
        return bookCopyService.getAllBookCopies();
    }
    @GetMapping("/{id}")
    public BookCopyDTO bookCopyById(@PathVariable int id) {
        return bookCopyService.getBookCopyById(id);
    }
    @GetMapping("/category")
    public List<BookCopyDTO> getBookCopiesByCategory(@RequestParam Category category) {
        return bookCopyService.getAllCopiesByCategory(category);
    }
    @GetMapping("/author")
    public List<BookCopyDTO> getBookCopiesByAuthor(@RequestParam Author author) {
        return bookCopyService.getAllCopiesByAuthor(author);
    }
    @PostMapping
    public ResponseEntity<BookCopyDTO> addBookCopy(@RequestBody AddBookCopyDTO bookCopyDTO) {
        return ResponseEntity.ok(bookCopyService.addBookCopy(bookCopyDTO));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBookCopy(@PathVariable int id) {
        return bookCopyService.deleteBookCopy(id);
    }
    @PutMapping("'/edit/{id}")
    public ResponseEntity<BookCopyDTO> updateBookCopy(@PathVariable int id, @RequestBody AddBookCopyDTO bookCopyDTO) {
        return ResponseEntity.ok(bookCopyService.updateBookCopy(id, bookCopyDTO));
    }
    @GetMapping("/available")
    public List<BookCopyDTO> getAvailableBooks(){
        return bookCopyService.getAvailableBooks();
    }
}
