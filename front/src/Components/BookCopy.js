import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {fetchBookCopy} from "../Service/BookCopyService";
import {AuthContext} from "./AuthContext";
import {LanguageContext} from "../LanguageAppContext";
import {BookCopyItem} from "./BookCopyItem";

export const BookCopy = () => {
    const location = useLocation()
    const [bookCopy, setBookCopy] = useState([]);
    const {logout} = useContext(AuthContext);
    const {translate} = useContext(LanguageContext);
    const [hoveredBook, setHoveredBook] = useState(null);
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    useEffect(() => {
        async function fetchData(token) {
            await fetchBookCopy(token).then((bookCopy) => {
                if(bookCopy === "problem"){
                    logout();
                }
                else {
                    setBookCopy(bookCopy)
                }
            });
        }
        const token = localStorage.getItem("token");
        fetchData(token);
    }, [location])
    return (<div className="book-list">
        {bookCopy.map((bookCopy) => (
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