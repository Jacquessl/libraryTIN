import {useContext, useState} from "react";
import {LanguageContext} from "../LanguageAppContext";
import {useNavigate} from "react-router-dom";

export const BookCopyItem = ({ bookCopy, onHover }) => {
    const {translate} = useContext(LanguageContext);
    const navigate = useNavigate();
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return (
        <div
            className="book-item"
            onMouseEnter={() => onHover(bookCopy)}
            onMouseLeave={() => onHover(null)}
        >
            <ul>
                <li>{bookCopy.book.title}</li>
                <button onClick={()=>navigate("/")}>{capitalizeFirstLetter(translate("reserve"))}</button>
            </ul>
        </div>
    );
};

