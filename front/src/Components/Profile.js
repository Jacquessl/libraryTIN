import {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {fetchUserMe} from "../Service/UserService";
import {fetchEmployeeMe} from "../Service/EmployeeService";
import {LanguageContext} from "../LanguageAppContext";
import {AuthContext} from "./AuthContext";


export const Profile = () => {
    const location = useLocation();
    const {logout, isEmployee} = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const {translate} = useContext(LanguageContext);
    useEffect(() => {
        async function fetchData(token) {
            if(isEmployee){
                fetchEmployeeMe(token).then(user => {
                    if (user === "problem") {
                        logout();
                    } else {
                        setUser(user);
                    }
                });
            }
            else {
                await fetchUserMe(token).then(user => {
                    if (user === "problem") {
                        logout();
                    } else {
                        setUser(user);
                    }
                });
            }
        }
        fetchData(localStorage.getItem("token"));
    }, [location]);
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return(
        <div>{user && (
            <ul>
                <li>{capitalizeFirstLetter(translate("firstName"))}: {user.firstName}</li>
                <li>{capitalizeFirstLetter(translate("lastName"))}: {user.lastName}</li>
                <li>{capitalizeFirstLetter("e-mail")}: {user.email}</li>
                <li>{capitalizeFirstLetter(translate("phone"))}: {user.phone}</li>
                <li>{capitalizeFirstLetter(translate("username"))}: {user.username}</li>
                {user.registeredDate &&
                    <li>{capitalizeFirstLetter(translate("registeredDate"))}: {new Date(user.registeredDate).toLocaleDateString("pl-PL")}</li>}
                {user.position && <li>{capitalizeFirstLetter(translate("position"))}: {user.position}</li>}
                {user.hireDate && <li>{capitalizeFirstLetter(translate("hireDate"))}: {new Date(user.hireDate).toLocaleDateString("pl-PL")}</li>}
            </ul>
        )}</div>
    )
}