import {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate, useNavigation} from "react-router-dom";
import {fetchBooks} from "../Service/BookService";
import {LanguageContext} from "../LanguageAppContext";
import {AuthContext} from "./AuthContext";
import {BookItem} from "./BookItem";
import {BookCopyItem} from "./BookCopyItem";

export const Books = () => {

    const [books, setBooks] = useState([])
    const {logout} = useContext(AuthContext);
    const location = useLocation()
    const {translate} = useContext(LanguageContext);
    const navigate = useNavigate();
    const [hoveredBook, setHoveredBook] = useState(null);


    useEffect(() => {
        async function fetchData() {
            await fetchBooks().then(books => {
                if(books === "problem"){
                    logout();
                }
                else {
                    setBooks(books)
                }
            });
        }
        fetchData();
        }, [location])
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    return (<div className="book-list">
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
    </div>)
}