import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../LanguageAppContext";
import { fetchBooks } from "../Service/BookService";
import "./styles/style.css";

export const Home = () => {
    const { translate } = useContext(LanguageContext);
    const navigate = useNavigate();
    const [featuredBooks, setFeaturedBooks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const books = await fetchBooks();
            if (books !== "problem") {
                setFeaturedBooks(books.slice(0, 4));
            }
        }
        fetchData();
    }, []);

    return (
        <div className="home-container">
            <h1 className="home-title">{translate("welcome")}</h1>
            <p className="home-subtitle">{translate("libraryDescription")}</p>

            <h2 className="home-section-title">{translate("featuredBooks")}</h2>
            <div className="book-list">
                {featuredBooks.map((book) => (
                    <div key={book.isbn} className="book-item">
                        <p>{book.title}</p>
                        <button onClick={() => navigate("/books", { state: { books: [book] } })}>
                            {translate("viewDetails")}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
