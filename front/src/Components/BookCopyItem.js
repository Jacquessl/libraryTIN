import {useContext, useState} from "react";
import {LanguageContext} from "../LanguageAppContext";
import {useNavigate} from "react-router-dom";
import {fetchBookCopy, fetchReserveBookCopy} from "../Service/BookCopyService";
import {AuthContext} from "./AuthContext";

export const BookCopyItem = ({ bookCopy, onHover, setBookCopies }) => {
    const {translate} = useContext(LanguageContext);
    const navigate = useNavigate();
    const {logout} = useContext(AuthContext);
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    async function reserveBook(){
        const token = localStorage.getItem("token");
        await fetchReserveBookCopy(token, bookCopy).then(async (res) => {
            if (res === "problem") {
                logout();
            } else {
                await fetchBookCopy(token).then((bookCopy) => {
                    if (bookCopy === "problem") {
                        logout();
                    } else {
                        setBookCopies(bookCopy)
                    }
                });
            }
        })
    }
    return (
        <div
            className="book-item"
            onMouseEnter={() => onHover(bookCopy)}
            onMouseLeave={() => onHover(null)}
        >
            <ul>
                <li>{bookCopy.book.title}</li>
                <button onClick={()=>reserveBook()}>{capitalizeFirstLetter(translate("reserve"))}</button>
            </ul>
        </div>
    );
};

