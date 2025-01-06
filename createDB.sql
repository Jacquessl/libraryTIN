CREATE DATABASE LibraryDB;
USE LibraryDB;

CREATE TABLE authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL
);

CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category_id INT,
    published_year YEAR,
    isbn VARCHAR(20) UNIQUE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL
);

CREATE TABLE book_authors (
    book_id INT,
    author_id INT,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE
);

CREATE TABLE book_copies (
    copy_id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT,
    condition_status ENUM('New', 'Good', 'Worn', 'Damaged') NOT NULL DEFAULT 'Good',
    available BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE
);

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    registered_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    hire_date DATE NOT NULL,
    position VARCHAR(50) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('librarian', 'manager') DEFAULT 'librarian'
);

CREATE TABLE loans (
    loan_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    copy_id INT,
    loan_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE NULL,
    employee_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (copy_id) REFERENCES book_copies(copy_id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE SET NULL
);

CREATE TABLE reservations (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    book_id INT,
    reservation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pending', 'Cancelled', 'Completed') DEFAULT 'Pending',
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE
);

INSERT INTO authors (first_name, last_name) VALUES
('J.K.', 'Rowling'),
('George', 'Orwell'),
('J.R.R.', 'Tolkien'),
('Stephen', 'King');

INSERT INTO categories (name) VALUES
('Fantasy'),
('Science Fiction'),
('Dystopian'),
('Classic'),
('Horror');

INSERT INTO books (title, category_id, published_year, isbn) VALUES
('Harry Potter and the Sorcerer''s Stone', 1, 1997, '978-0747532699'),
('1984', 3, 1949, '978-0451524935'),
('The Hobbit', 1, 1937, '978-0261102217'),
('The Shining', 5, 1977, '978-0385121675');

INSERT INTO book_authors (book_id, author_id) VALUES
(1, 1),  -- J.K. Rowling - Harry Potter
(2, 2),  -- George Orwell - 1984
(3, 3),  -- J.R.R. Tolkien - The Hobbit
(4, 4);  -- Stephen King - The Shining

INSERT INTO book_copies (book_id, condition_status, available) VALUES
(1, 'Good', TRUE),
(1, 'New', TRUE),
(2, 'Worn', FALSE),
(3, 'Good', TRUE),
(4, 'Good', TRUE),
(4, 'Worn', FALSE);

INSERT INTO users (first_name, last_name, email, phone, username, password_hash) VALUES
('Anna', 'Kowalska', 'anna.kowalska@example.com', '123-456-789', 'anna_k', SHA2('password123', 256)),
('Jan', 'Nowak', 'jan.nowak@example.com', '987-654-321', 'jan_n', SHA2('securepass', 256));

INSERT INTO employees (first_name, last_name, email, phone, hire_date, position, username, password_hash, role) VALUES
('Adam', 'Wiśniewski', 'adam.wisniewski@example.com', '555-555-555', '2020-05-10', 'Librarian', 'adam_w', SHA2('librarian123', 256), 'librarian'),
('Ewa', 'Zielińska', 'ewa.zielinska@example.com', '666-666-666', '2018-09-15', 'Manager', 'ewa_z', SHA2('managerpass', 256), 'manager');

INSERT INTO loans (user_id, copy_id, loan_date, due_date, employee_id) VALUES
(1, 1, '2023-12-01', '2023-12-15', 1),
(2, 2, '2023-12-02', '2023-12-16', 2),
(1, 3, '2023-12-05', '2023-12-19', 1);

INSERT INTO reservations (user_id, book_id, reservation_date, status) VALUES
(1, 2, '2023-12-01 10:30:00', 'Pending'),
(2, 1, '2023-12-02 14:00:00', 'Completed');

