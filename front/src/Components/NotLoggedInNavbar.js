import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {LanguageContext} from "../LanguageAppContext";
import {AllExceptEmployeesNavbar} from "./AllExceptEmployeesNavbar";
import './styles/style.css';
export const NotLoggedInNavbar = () => {
    const navigate = useNavigate();
    const {translate} = useContext(LanguageContext);
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return (
        <div className="navbar-container" style={{ width: "100%" }}>

            <AllExceptEmployeesNavbar/>
                <ul className="navbar">
                <li onClick={() => navigate("/login")}>{capitalizeFirstLetter(translate("login"))}</li>
            </ul>
        </div>
        )
        }