package com.example.demo.Entity.DTO;

import com.example.demo.Entity.BookCopy;
import com.example.demo.Enums.ConditionStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class BookCopyDTO {
    private int copyId;
    private BookDTO book;
    private ConditionStatus conditionStatus;
    private boolean available;

    public BookCopyDTO(BookCopy bookCopy){
        this.copyId = bookCopy.getCopyId();
        this.book = new BookDTO(bookCopy.getBook());
        this.conditionStatus = bookCopy.getConditionStatus();
        this.available = bookCopy.isAvailable();
    }
}
