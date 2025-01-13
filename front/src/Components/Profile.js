import {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchUserMe, fetchUserDelete} from "../Service/UserService";
import {fetchEmployeeMe} from "../Service/EmployeeService";
import {LanguageContext} from "../LanguageAppContext";
import {AuthContext} from "./AuthContext";
import "./styles/userStyle.css";

export const Profile = () => {
    const location = useLocation();
    const {logout, isEmployee, isLoggedIn} = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const {translate} = useContext(LanguageContext);
    const navigate = useNavigate();

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
        if(isLoggedIn) {
            fetchData(localStorage.getItem("token"));
        } else {
            navigate("/login");
        }
    }, [location]);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm(translate("confirmDeleteAccount"));
        if (confirmDelete) {
            const result = await fetchUserDelete(localStorage.getItem("token"), user.userId);
            if (result.success) {
                logout();
                navigate("/login");
            } else {
                logout();
                navigate("/login");
            }
        }
    };

    return (
        <div className="profile-container">
            {user && (
                <div className="profile-card">
                    <h2 className="profile-title">{user.firstName} {user.lastName}</h2>
                    <ul className="profile-list">
                        <li><strong>{capitalizeFirstLetter("e-mail")}:</strong> {user.email}</li>
                        <li><strong>{capitalizeFirstLetter(translate("phone"))}:</strong> {user.phone}</li>
                        <li><strong>{capitalizeFirstLetter(translate("username"))}:</strong> {user.username}</li>
                        {user.registeredDate &&
                            <li><strong>{capitalizeFirstLetter(translate("registeredDate"))}:</strong> {new Date(user.registeredDate).toLocaleDateString("pl-PL")}</li>}
                        {user.position && <li><strong>{capitalizeFirstLetter(translate("position"))}:</strong> {user.position}</li>}
                        {user.hireDate && <li><strong>{capitalizeFirstLetter(translate("hireDate"))}:</strong> {new Date(user.hireDate).toLocaleDateString("pl-PL")}</li>}
                    </ul>
                    <div className="profile-buttons">
                        <button onClick={() => {
                            if (isEmployee) {
                                navigate("/addUser", {state: {employee: user, addEmployee: true}});
                            } else {
                                navigate("/addUser", { state: { user: user } });
                            }
                        }}>{capitalizeFirstLetter(translate("edit"))}</button>

                        <button onClick={() => navigate("/changePassword", { state: isEmployee ? { employee: user } : { user: user } })}>
                            {capitalizeFirstLetter(translate("changePassword"))}
                        </button>

                        {!isEmployee && <button className="delete-account-button" onClick={handleDeleteAccount}>
                            {capitalizeFirstLetter(translate("deleteAccount"))}
                        </button>}
                    </div>
                </div>
            )}
        </div>
    );
}
