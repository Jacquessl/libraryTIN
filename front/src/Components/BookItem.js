import {useContext, useState} from "react";
import {LanguageContext} from "../LanguageAppContext";
import {useNavigate} from "react-router-dom";

export const BookItem = ({ book, onHover }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const {translate} = useContext(LanguageContext);
    const navigate = useNavigate();
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return (
        <div
            className="book-item"
            onMouseEnter={() => onHover(book)}
            onMouseLeave={() => onHover(null)}
        >
            <ul>
                <li>{book.title}</li>
                <button onClick={()=>navigate(`/bookCopy/available/${book.id}`)}>{capitalizeFirstLetter(translate("checkAvailability"))}</button>
            </ul>
        </div>
    );
};

