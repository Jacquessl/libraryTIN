import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {fetchAvailableBookCopyById} from "../Service/BookCopyService";
import {LanguageContext} from "../LanguageAppContext";
import {AuthContext} from "./AuthContext";
import {BookCopyItem} from "./BookCopyItem";
import "./styles/BookCopies.css"

export const BookCopyAvailable = () => {
    const {id} = useParams();
    const location = useLocation();
    const {translate} = useContext(LanguageContext);
    const [books, setBooks] = useState([]);
    const {logout, isLoggedIn, isEmployee} = useContext(AuthContext);
    const [hoveredBook, setHoveredBook] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData(token) {
            setBooks([]);
            if(!isLoggedIn){
                navigate("/login");
            }
            await fetchAvailableBookCopyById(token, id).then((response) => {
                if(response === "problem"){
                    logout();
                }
                else {
                    setBooks(response);
                }
            })
        }
        fetchData(localStorage.getItem("token"));
    }, [location]);
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return (
        <div className="book-copies-container">
            <h2 className="book-copies-title">{capitalizeFirstLetter(translate("books"))}</h2>
            <div className="book-list">
                {isLoggedIn && !isEmployee &&
                    books.map((bookCopy) => (
                        <BookCopyItem
                            key={bookCopy.book.copyId}
                            bookCopy={bookCopy}
                            onHover={setHoveredBook}
                            setBookCopies={setBooks}
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
            </div>
        </div>
    );

}
