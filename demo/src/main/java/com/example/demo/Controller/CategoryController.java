package com.example.demo.Controller;

import com.example.demo.Entity.DTO.AddCategoryDTO;
import com.example.demo.Entity.DTO.CategoryDTO;
import com.example.demo.Service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<CategoryDTO> getCategory(@RequestParam(required = false) String name) {
        if(name != null && !name.isEmpty()) {
            return categoryService.getCategoriesByName(name);
        }
        return categoryService.getAllCategories();
    }
    @GetMapping("/{id}")
    public CategoryDTO getCategoryById(@PathVariable int id) {
        return categoryService.getCategoryById(id);
    }
    @PostMapping("/add")
    public ResponseEntity<CategoryDTO> addCategory(@RequestBody AddCategoryDTO categoryDTO) {
        return categoryService.addCategory(categoryDTO);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable int id) {
        return categoryService.deleteCategory(id);
    }
    @PutMapping("/edit/{id}")
    public ResponseEntity<CategoryDTO> editCategory(@PathVariable int id, @RequestBody AddCategoryDTO categoryDTO) {
        return categoryService.editCategory(id, categoryDTO);
    }
}
