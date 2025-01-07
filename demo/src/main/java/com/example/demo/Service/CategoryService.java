package com.example.demo.Service;

import com.example.demo.Entity.Book;
import com.example.demo.Entity.Category;
import com.example.demo.Entity.DTO.AddCategoryDTO;
import com.example.demo.Entity.DTO.BookDTO;
import com.example.demo.Entity.DTO.CategoryDTO;
import com.example.demo.Repository.BookRepositoryInterface;
import com.example.demo.Repository.CategoryRepositoryInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepositoryInterface categoryRepository;
    private final BookRepositoryInterface bookRepositoryInterface;

    public CategoryService(CategoryRepositoryInterface categoryRepository, BookRepositoryInterface bookRepositoryInterface) {
        this.categoryRepository = categoryRepository;
        this.bookRepositoryInterface = bookRepositoryInterface;
    }
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream().map(CategoryDTO::new).sorted(Comparator.comparingInt(CategoryDTO::getId)).collect(Collectors.toList());
    }
    public CategoryDTO getCategoryById(int id) {
        return categoryRepository.findById(id).map(CategoryDTO::new).orElse(null);
    }
    public List<CategoryDTO> getCategoriesByName(String name) {
        return categoryRepository.findByNameContaining(name).stream().map(CategoryDTO::new).sorted(Comparator.comparingInt(CategoryDTO::getId)).collect(Collectors.toList());
    }
    public ResponseEntity<CategoryDTO> addCategory(AddCategoryDTO categoryDTO) {
        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setBooks(categoryDTO.getBooks().stream().map(e -> bookRepositoryInterface.findById(e.getId()).get()).collect(Collectors.toSet()));
        Category addedCategory = categoryRepository.save(category);
        return ResponseEntity.ok(new CategoryDTO(addedCategory));
    }
    public ResponseEntity<String> deleteCategory(int id) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            List<Book> books = bookRepositoryInterface.findBooksByCategory(category.get());
            if (books.isEmpty()){
                categoryRepository.deleteById(id);
                return ResponseEntity.ok("Deleted Category");
            }
            return ResponseEntity.status(500).body("Books in category");
        }
        return ResponseEntity.status(404).body("Category Not Found");
    }
    public ResponseEntity<CategoryDTO> editCategory(int id, AddCategoryDTO categoryDTO) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            category.get().setName(categoryDTO.getName());
            category.get().setBooks(categoryDTO.getBooks().stream().map(e -> bookRepositoryInterface.findById(e.getId()).get()).collect(Collectors.toSet()));
            Category updatedCategory = categoryRepository.save(category.get());
            return ResponseEntity.ok(new CategoryDTO(updatedCategory));
        }
        return ResponseEntity.status(404).body(null);
    }
}
