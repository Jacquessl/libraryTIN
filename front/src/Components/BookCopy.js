import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {fetchBookCopy} from "../Service/BookCopyService";
import {AuthContext} from "./AuthContext";

export const BookCopy = () => {
    const location = useLocation()
    const [bookCopy, setBookCopy] = useState([]);
    const {logout} = useContext(AuthContext);

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
    return (<div>{bookCopy.map((bookCopy) => (
            <ul>
                <li>{bookCopy.book.title}</li>
            </ul>
    ))}</div>)
}