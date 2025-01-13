import {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {LanguageContext} from "../LanguageAppContext";
import {fetchCategories} from "../Service/CategoriesService";
import {AuthContext} from "./AuthContext";
import "./styles/Category.css"
export const Category= () => {
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const {translate} = useContext(LanguageContext);
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            await fetchCategories().then(categories => {
                if(categories === "problem"){
                    logout();
                }
                else {
                    setCategories(categories)
                }
        })}
        fetchData();
    }, [location])
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return (
        <div className="category-container">
            <h1 className="category-title">{capitalizeFirstLetter(translate("categoriesList"))}</h1>
            <ul className="category-list">
                {categories.map(category => (
                    <li
                        className="category-item"
                        onClick={() => navigate("/books", { state: { books: category.books } })}
                        key={category.id}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );

}