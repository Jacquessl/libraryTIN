import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {LanguageContext} from "../LanguageAppContext";
import {fetchBooksContaingName} from "../Service/BookService";

export const AllExceptEmployeesNavbar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const navigate = useNavigate();
    const {translate} = useContext(LanguageContext);

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
                        setResults(response);
                    })
                    .catch(error => console.error("Error fetching data:", error));
            }
            fetchData();
        }
    }, [debouncedQuery]);
    return (
        <div>
            <ul>
                <li onClick={() => navigate("/")}>{capitalizeFirstLetter(translate("home"))}</li>
                <li onClick={()=>navigate("/books")}>{capitalizeFirstLetter(translate("books"))}</li>
                {/*<li onClick={()=>navigate("/categories")}>{capitalizeFirstLetter(translate("categories"))}</li>*/}
                <li>
                    <form>
                        <input type="text" onChange={(e) => setQuery(e.target.value)}
                               placeholder={translate("inputsearch")}></input>
                        <button type="submit">{capitalizeFirstLetter(translate("search"))}</button>
                    </form>
                </li>
                {results.map((book) => (
                    <li key={book.id}>
                        <strong>{book.title}</strong> ({book.publishedYear}) - {book.category}
                        <br/>
                        ISBN: {book.isbn}
                        <br/>
                        {capitalizeFirstLetter(translate("authors"))}: {book.authors.join(", ")}
                    </li>
                ))}
            </ul>
        </div>
    )
}