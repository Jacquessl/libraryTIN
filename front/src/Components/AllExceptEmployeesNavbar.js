import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {LanguageContext} from "../LanguageAppContext";
import {fetchBooksContaingName} from "../Service/BookService";
import {AuthContext} from "./AuthContext";
import './styles/style.css';

export const AllExceptEmployeesNavbar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const navigate = useNavigate();
    const {logout, isEmployee} = useContext(AuthContext);
    const {translate} = useContext(LanguageContext);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    useEffect( () => {
        if (debouncedQuery.length > 2) {
            async function fetchData() {
                await fetchBooksContaingName(debouncedQuery)
                    .then(response => {
                        if(response === "problem"){
                            logout();
                        }
                        else {
                            setResults(response);
                        }
                    })
                    .catch(error => console.error("Error fetching data:", error));
            }
            fetchData();
        }
    }, [debouncedQuery]);
    return (
        <div>
            <ul className="navbar">
                <li onClick={() => navigate("/")}>{capitalizeFirstLetter(translate("home"))}</li>
                <li onClick={() => navigate("/books")}>{capitalizeFirstLetter(translate("books"))}</li>
                <li onClick={() => navigate("/categories")}>{capitalizeFirstLetter(translate("categories"))}</li>
                <li>
                    <div className="search-bar">
                        <input
                            type="text"
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={translate("inputsearch")}
                            onFocus={() => setShowResults(true)}
                            onBlur={() => setTimeout(() => setShowResults(false), 200)}
                        />
                        <button onClick={()=>navigate("/books", {state:{bookTitle:query}})} className="search-button" type="submit">
                            {capitalizeFirstLetter(translate("search"))}
                        </button>

                        {showResults && results.length > 0 && (
                            <ul className="search-results">
                                {results.slice(0, 5).map((book) => (
                                    <li key={book.id} onClick={() => {
                                        if (isEmployee) {
                                            navigate(`/book`, { state: { book } });
                                        } else {
                                            navigate(`/bookCopy/available/${book.id}`)
                                        }
                                    }}
                                    >
                                        <strong>{book.title}</strong> ({book.publishedYear}) - {book.category}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </li>
            </ul>
        </div>
)
}