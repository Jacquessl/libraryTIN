import {useContext, useState} from "react";
import {LanguageContext} from "../LanguageAppContext";
import {useNavigate} from "react-router-dom";
import {fetchReserveBookCopy} from "../Service/BookCopyService";

export const BookCopyItem = ({ bookCopy, onHover }) => {
    const {translate} = useContext(LanguageContext);
    const navigate = useNavigate();
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    async function reserveBook(){
        const token = localStorage.getItem("token");
        await fetchReserveBookCopy(token, bookCopy).then((res)=> {
            if(res === "problem"){
                console.log("nieUdaloSieCos");
            }else{
                navigate("/");
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

