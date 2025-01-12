import {useContext} from "react";
import {AuthContext} from "./AuthContext";
import {ManagerNavbar} from "./ManagerNavbar";
import {AllExceptEmployeesNavbar} from "./AllExceptEmployeesNavbar";
import {LanguageContext} from "../LanguageAppContext";
import {useNavigate} from "react-router-dom";

export const EmployeeNavbar = () => {
    const {isManager} = useContext(AuthContext);
    const {translate} = useContext(LanguageContext);
    const navigate = useNavigate();
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return (<div>{isManager && <ManagerNavbar/>}
        <ul className="navbar">
            <li onClick={()=>navigate("/users")}>{capitalizeFirstLetter(translate("users"))}</li>
            <li onClick={()=>navigate("/reservations")}>{capitalizeFirstLetter(translate("reservations"))}</li>
            <li onClick={()=>navigate("/loans")}>{capitalizeFirstLetter(translate("loans"))}</li>
            <AllExceptEmployeesNavbar/>
        </ul>
    </div>)
}