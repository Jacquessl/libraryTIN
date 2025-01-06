package com.example.demo.Entity.DTO;

import com.example.demo.Entity.BookCopy;
import com.example.demo.Enums.ConditionStatus;
import lombok.Getter;

@Getter
public class AddBookCopyDTO {
    private BookDTO book;
    private ConditionStatus conditionStatus;
    private boolean available;

    public AddBookCopyDTO(BookCopy bookCopy){
        this.book = new BookDTO(bookCopy.getBook());
        this.conditionStatus = bookCopy.getConditionStatus();
        this.available = bookCopy.isAvailable();
    }
}
