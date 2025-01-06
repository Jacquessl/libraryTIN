package com.example.demo.Repository;

import com.example.demo.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepositoryInterface extends JpaRepository<Category, Integer> {
    Category findByName(String name);
}
