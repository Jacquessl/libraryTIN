package com.example.demo.Service;

import com.example.demo.Entity.Author;
import com.example.demo.Entity.Book;
import com.example.demo.Entity.Category;
import com.example.demo.Entity.DTO.AddBookDTO;
import com.example.demo.Entity.DTO.BookDTO;
import com.example.demo.Repository.AuthorRepositoryInterface;
import com.example.demo.Repository.BookCopyRepositoryInterface;
import com.example.demo.Repository.BookRepositoryInterface;
import com.example.demo.Repository.CategoryRepositoryInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {

    private final BookRepositoryInterface bookRepository;
    private final AuthorRepositoryInterface authorRepository;
    private final BookCopyRepositoryInterface bookCopyRepository;
    private final CategoryRepositoryInterface categoryRepository;

    public BookService(BookRepositoryInterface bookRepository, AuthorRepositoryInterface authorRepository, BookCopyRepositoryInterface bookCopyRepository, CategoryRepositoryInterface categoryRepositoryInterface) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.bookCopyRepository = bookCopyRepository;
        this.categoryRepository = categoryRepositoryInterface;
    }
    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll().stream().map(BookDTO::new).collect(Collectors.toList());
    }
    public List<BookDTO> getBooksByTitle(String title) {
        return bookRepository.findBooksByTitleContaining(title).stream().map(BookDTO::new).collect(Collectors.toList());
    }
    public List<BookDTO> getBookByISBN(String isbn){
        return (List<BookDTO>) bookRepository.findByIsbn(isbn).map(BookDTO::new).orElse(null);
    }
    public BookDTO getBookById(int id){
        return bookRepository.findById(id).map(BookDTO::new).orElse(null);
    }
    public List<BookDTO> getBooksByCategory(Category category){
        return bookRepository.findBooksByCategory(category).stream().map(BookDTO::new).collect(Collectors.toList());
    }
    public List<BookDTO> getBooksByAuthor(Author author){
        return bookRepository.findByAuthorsContaining(author).stream().map(BookDTO::new).collect(Collectors.toList());
    }
    public BookDTO addBook(AddBookDTO bookDTO) {
        Book newBook = new Book();
        newBook.setTitle(bookDTO.getTitle());
        Category cat = categoryRepository.getById(bookDTO.getCategoryId());
        newBook.setCategory(cat);
        newBook.setPublishedYear(bookDTO.getPublishedYear());
        newBook.setIsbn(bookDTO.getIsbn());
        newBook.setAuthors(bookDTO.getAuthorsIds().stream().map(authorRepository::findByAuthorId).collect(Collectors.toSet()));
        Book savedBook = bookRepository.save(newBook);
        return new BookDTO(savedBook);
    }
    public ResponseEntity<String> deleteBook(int id){
        if(bookCopyRepository.existsById(id)) {
            bookRepository.deleteById(id);
            return ResponseEntity.ok("Deleted Book");
        }else{
            return ResponseEntity.status(500).body("Book copy still in library");
        }
    }
    public BookDTO updateBook(int id, AddBookDTO bookDTO){
        Optional<Book> book = bookRepository.findById(id);
        if(book.isPresent()){
            book.get().setTitle(bookDTO.getTitle());
            Category cat = categoryRepository.getById(bookDTO.getCategoryId());
            book.get().setCategory(cat);
            book.get().setPublishedYear(bookDTO.getPublishedYear());
            book.get().setIsbn(bookDTO.getIsbn());
            book.get().setAuthors(bookDTO.getAuthorsIds().stream().map(authorRepository::findByAuthorId).collect(Collectors.toSet()));
            Book savedBook = bookRepository.save(book.get());
            return new BookDTO(savedBook);
        }
        return null;
    }
}
