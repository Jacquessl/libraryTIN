import {useContext, useEffect} from "react";
import {EmployeeNavbar} from "./EmployeeNavbar";
import {NotLoggedInNavbar} from "./NotLoggedInNavbar";
import {AuthContext} from "./AuthContext";
import {LanguageContext} from "../LanguageAppContext";
import {AllExceptEmployeesNavbar} from "./AllExceptEmployeesNavbar";

export const Navbar = () => {
    const { isEmployee, isLoggedIn, login } = useContext(AuthContext);
    const { translate } = useContext(LanguageContext);
    useEffect(() => {
        login()
    }, [])
    return (<div>
            {isEmployee ? <EmployeeNavbar /> : isLoggedIn ? <div><AllExceptEmployeesNavbar/></div> : <NotLoggedInNavbar/>}</div>
    )
}