import {useLocation, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {LanguageContext} from "../LanguageAppContext";
import {AuthContext} from "./AuthContext";
import {fetchBookById} from "../Service/BookService";

export const Book = () => {
    const {id} = useParams();
    const {translate} = useContext(LanguageContext);
    const [book, setBook] = useState(null);
    const location = useLocation();
    const {logout} = useContext(AuthContext);

    useEffect(() => {
        console.log("HELOM")
        async function fetchData() {
            await fetchBookById(id).then(book => {
                if(book === "problem"){
                    logout();
                }
                else {
                    setBook(book)
                }
            })
        }
        fetchData();
    }, [location]);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return (

        <div className="book">
            {book &&
                <ul>
                    <li>{capitalizeFirstLetter(translate("title"))}: {book.title}</li>
                    <li>{capitalizeFirstLetter(translate("publishedYear"))}: {book.publishedYear}</li>
                    <li>ISBN: {book.isbn}</li>
                    <li>{capitalizeFirstLetter(translate("authors"))}: {book.authors.join(", ")}</li>
                </ul>
            }
        </div>

    )
}