package com.example.demo.Repository;

import com.example.demo.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepositoryInterface extends JpaRepository<Category, Integer> {
    List<Category> findByNameContaining(String name);
}
