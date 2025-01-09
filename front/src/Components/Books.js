import {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate, useNavigation} from "react-router-dom";
import {fetchBooks} from "../Service/BookService";
import {LanguageContext} from "../LanguageAppContext";
import {AuthContext} from "./AuthContext";

export const Books = () => {

    const [books, setBooks] = useState([])
    const {logout} = useContext(AuthContext);
    const location = useLocation()
    const {translate} = useContext(LanguageContext);
    const navigate = useNavigate();

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

    return (
        <div>
            <h1>{capitalizeFirstLetter(translate("booksList"))}</h1>
            <ul>
                {books.map((book) => (
                    <li onClick={()=>navigate(`/book/${book.id}`)} key={book.id}>
                        {book.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}