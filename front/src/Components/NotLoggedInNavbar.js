import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {LanguageContext} from "../LanguageAppContext";
import {AllExceptEmployeesNavbar} from "./AllExceptEmployeesNavbar";

export const NotLoggedInNavbar = () => {
    const navigate = useNavigate();
    const {translate} = useContext(LanguageContext);
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return (<div>
        <nav>
        <AllExceptEmployeesNavbar/>
            <ul>
                <li onClick={() => navigate("/login")}>{capitalizeFirstLetter(translate("login"))}</li>
            </ul>
        </nav>
    </div>)
}