import {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchBooks, fetchBooksContainingTitle} from "../Service/BookService";
import {LanguageContext} from "../LanguageAppContext";
import {BookItem} from "./BookItem";
import "./styles/Book.css"
import {AuthContext} from "./AuthContext";
export const Books = () => {

    const [books, setBooks] = useState([])
    const location = useLocation()
    const {translate} = useContext(LanguageContext);
    const navigate = useNavigate();
    const [hoveredBook, setHoveredBook] = useState(null);
    const bookList = location.state?.books
    const bookTitle = location.state?.bookTitle;
    const {isEmployee} = useContext(AuthContext);

    useEffect(() => {
        if(bookList){
            setBooks(bookList);
        }else {
            if(bookTitle){
                async function fetchData(){
                    await fetchBooksContainingTitle(bookTitle).then(res=>{
                        if(res==="problem"){

                        }else{
                            setBooks(res);
                        }
                    })

                }
                fetchData();
            }else {
                async function fetchData() {
                    await fetchBooks().then(books => {
                        if (books === "problem") {

                        } else {
                            setBooks(books)
                        }
                    });
                }
                fetchData();

            }
        }
        }, [location])
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    return (
        <div className="books-container">
            <h2 className="books-title">{capitalizeFirstLetter(translate("booksList"))}</h2>
            <div className="book-list">
                {books.map((book) => (
                    <BookItem
                        key={book.isbn}
                        book={book}
                        onHover={setHoveredBook}
                    />
                ))}

                {hoveredBook && (
                    <div className="tooltip-fixed">
                        <div className="tooltip-content">
                            <h3>{hoveredBook.title}</h3>
                            <p><strong>ISBN:</strong> {hoveredBook.isbn}</p>
                            <p><strong>{capitalizeFirstLetter(translate("authors"))}:</strong> {hoveredBook.authors.join(", ")}</p>
                            <p><strong>{capitalizeFirstLetter(translate("publishedYear"))}</strong> {hoveredBook.publishedYear}</p>
                        </div>
                    </div>
                )}
            </div>
            {isEmployee && <button className="add-book-button" onClick={() => navigate("/book")}>
                {capitalizeFirstLetter(translate("addBook"))}
            </button>}
        </div>
    );

}