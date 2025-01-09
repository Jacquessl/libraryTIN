import {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {LanguageContext} from "../LanguageAppContext";
import {fetchCategories} from "../Service/CategoriesService";
import {AuthContext} from "./AuthContext";

export const Category= () => {
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const {translate} = useContext(LanguageContext);
    const {logout} = useContext(AuthContext);

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
    return(
        <div><h1>{capitalizeFirstLetter(translate("categoriesList"))}</h1>
        <ul>
            {categories.map(category => (
                <li key={category.id}>
                    {category.name}
                </li>
            ))}
        </ul>
        </div>
    )
}