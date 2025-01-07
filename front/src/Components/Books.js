import {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {fetchBooks} from "../Service/BookService";
import {LanguageContext} from "../LanguageAppContext";

export const Books = () => {

    const [books, setBooks] = useState([])
    const location = useLocation()
    const {translate} = useContext(LanguageContext);

    useEffect(() => {
        async function fetchData() {
            await fetchBooks().then(books => setBooks(books));
        }
        fetchData();
        }, [location])
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    return (
        <div>
            <h1>{capitalizeFirstLetter(translate("booksList"))}</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <strong>{book.title}</strong> ({book.publishedYear}) - {book.category}
                        <br/>
                        ISBN: {book.isbn}
                        <br/>
                        {capitalizeFirstLetter(translate("authors"))}: {book.authors.join(", ")}                    </li>
                ))}
            </ul>
        </div>
    )
}