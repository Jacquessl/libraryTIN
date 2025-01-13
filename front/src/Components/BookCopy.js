import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {fetchBookCopy} from "../Service/BookCopyService";
import {AuthContext} from "./AuthContext";
import {LanguageContext} from "../LanguageAppContext";
import {BookCopyItem} from "./BookCopyItem";
import "./styles/BookCopies.css"
export const BookCopy = () => {
    const location = useLocation()
    const [bookCopy, setBookCopy] = useState([]);
    const {logout} = useContext(AuthContext);
    const {translate} = useContext(LanguageContext);
    const [hoveredBook, setHoveredBook] = useState(null);
    const {isLoggedIn, isEmployee} = useContext(AuthContext);
    const navigate = useNavigate();
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
        if(isLoggedIn) {
            const token = localStorage.getItem("token");
            fetchData(token);
        }else{
            navigate("/login");
        }
    }, [location])
    return (
        <div className="book-copies-container">
            <h2 className="book-copies-title">{capitalizeFirstLetter(translate("books"))}</h2>
            {isLoggedIn && !isEmployee && (
                <div className="book-list">
                    {bookCopy.map((bookCopy) => (
                        <BookCopyItem
                            key={bookCopy.book.copyId}
                            bookCopy={bookCopy}
                            onHover={setHoveredBook}
                            setBookCopies={setBookCopy}
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
            )}
        </div>
    );

}