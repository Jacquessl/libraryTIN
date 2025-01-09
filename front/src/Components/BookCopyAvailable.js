import {useLocation, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {fetchAvailableBookCopyById} from "../Service/BookCopyService";
import {LanguageContext} from "../LanguageAppContext";
import {AuthContext} from "./AuthContext";
import {BookCopyItem} from "./BookCopyItem";

export const BookCopyAvailable = () => {
    const {id} = useParams();
    const location = useLocation();
    const {translate} = useContext(LanguageContext);
    const [books, setBooks] = useState([]);
    const {logout} = useContext(AuthContext);
    const [hoveredBook, setHoveredBook] = useState(null);

    useEffect(() => {
        async function fetchData(token) {
            await fetchAvailableBookCopyById(token, id).then((response) => {
                if(response === "problem"){
                    logout();
                }
                else {
                    setBooks(response)
                }
            })
        }
        fetchData(localStorage.getItem("token"));
    }, [location]);
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return(<div className="book-list">
        {books.map((bookCopy) => (
            <BookCopyItem
                key={bookCopy.book.isbn}
                bookCopy={bookCopy}
                onHover={setHoveredBook}
            />
        ))}

        {hoveredBook && (
            <div className="tooltip-fixed">
                <div className="tooltip-content">
                    <h3>{hoveredBook.book.title}</h3>
                    <p><strong>ISBN:</strong> {hoveredBook.book.isbn}</p>
                    <p><strong>{capitalizeFirstLetter(translate("authors"))}:</strong> {hoveredBook.book.authors.join(", ")}</p>
                    <p><strong>{capitalizeFirstLetter(translate("publishedYear"))}:</strong> {hoveredBook.book.publishedYear}</p>
                    <p><strong>{capitalizeFirstLetter(translate("condition"))}:</strong> {hoveredBook.conditionStatus}</p>
                </div>
            </div>
        )}
    </div>)
}
