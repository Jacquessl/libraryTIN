import {useContext} from "react";
import {LanguageContext} from "../LanguageAppContext";
import {useNavigate} from "react-router-dom";

export const ManagerNavbar = () => {
    const {translate} = useContext(LanguageContext);
    const navigate = useNavigate();
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return (<ul className="navbar">
        <li onClick={()=>navigate("/users", {state:{showEmployees:true}})}>{capitalizeFirstLetter(translate("employees"))}</li></ul>)
}