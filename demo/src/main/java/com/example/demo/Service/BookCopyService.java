package com.example.demo.Service;

import com.example.demo.Entity.Author;
import com.example.demo.Entity.Book;
import com.example.demo.Entity.BookCopy;
import com.example.demo.Entity.Category;
import com.example.demo.Entity.DTO.AddBookCopyDTO;
import com.example.demo.Entity.DTO.BookCopyDTO;
import com.example.demo.Repository.BookCopyRepositoryInterface;
import com.example.demo.Repository.BookRepositoryInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class BookCopyService {

    private final BookCopyRepositoryInterface bookCopyRepository;
    private final BookRepositoryInterface bookRepository;

    public BookCopyService(BookCopyRepositoryInterface bookCopyRepository, BookRepositoryInterface bookRepository) {
        this.bookCopyRepository = bookCopyRepository;
        this.bookRepository = bookRepository;
    }

    public List<BookCopyDTO> getAllBookCopies(){
        return bookCopyRepository.findAll().stream().map(BookCopyDTO::new).collect(Collectors.toList());
    }
    public List<BookCopyDTO> getAllCopiesByISBN(String isbn){
        Optional<Book> books = bookRepository.findByIsbn(isbn);
        if(books.isPresent()) {
            return mapBooksToBooksCopy(new ArrayList<>((Collection) books.get()));
        }
        return new ArrayList<>();
    }
    public List<BookCopyDTO> getAllCopiesByTitle(String title){
        List<Book> books = bookRepository.findBooksByTitleContaining(title);
        return mapBooksToBooksCopy(books);
    }
    public BookCopyDTO getBookCopyById(int id){
        return bookCopyRepository.findById(id).map(BookCopyDTO::new).orElse(null);
    }
    public List<BookCopyDTO> getAllCopiesByCategory(Category category){
        List<Book> books = bookRepository.findBooksByCategory(category);
        return mapBooksToBooksCopy(books);
    }
    public List<BookCopyDTO> getAllCopiesByAuthor(Author author){
        List<Book> books = bookRepository.findByAuthorsContaining(author);
        return mapBooksToBooksCopy(books);
    }
    private List<BookCopyDTO> mapBooksToBooksCopy(List<Book> books){
        return books.stream()
                .flatMap(book -> (bookCopyRepository.findByBook(book))
                        .stream()
                        .map(BookCopyDTO::new))
                .collect(Collectors.toList());
    }
    public BookCopyDTO addBookCopy(AddBookCopyDTO bookCopyDTO){
        BookCopy bookCopy = new BookCopy();
        Optional<Book> book = bookRepository.findById(bookCopyDTO.getBook().getId());
        if(book.isPresent()) {
            bookCopy.setBook(book.get());
            bookCopy.setAvailable(bookCopyDTO.isAvailable());
            bookCopy.setConditionStatus(bookCopyDTO.getConditionStatus());
            BookCopy savedBookCopy = bookCopyRepository.save(bookCopy);
            return new BookCopyDTO(savedBookCopy);
        }
        return null;
    }
    public ResponseEntity<String> deleteBookCopy(int id){
        BookCopy bookCopy = bookCopyRepository.findById(id).orElse(null);
        if(bookCopy.isAvailable()){
            bookCopyRepository.deleteById(id);
            return ResponseEntity.ok("Delete Success");
        }
        return ResponseEntity.status(500).body("Delete Failed");
    }
    public BookCopyDTO updateBookCopy(int id, AddBookCopyDTO bookCopyDTO){
        Optional<BookCopy> bookCopy = bookCopyRepository.findById(id);
        if(bookCopy.isPresent()) {
            Book book = bookRepository.findById(bookCopyDTO.getBook().getId()).get();
            bookCopy.get().setBook(book);
            bookCopy.get().setAvailable(bookCopyDTO.isAvailable());
            bookCopy.get().setConditionStatus(bookCopyDTO.getConditionStatus());
            BookCopy savedBookCopy = bookCopyRepository.save(bookCopy.get());
            return new BookCopyDTO(savedBookCopy);
        }
        return null;
    }
    public List<BookCopyDTO> getAvailableBooks(){
        return bookCopyRepository.findByAvailable(true).stream().map(BookCopyDTO::new).collect(Collectors.toList());
    }
}
