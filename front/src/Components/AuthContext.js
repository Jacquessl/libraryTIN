import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isEmployee, setIsEmployee] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isManager, setIsManager] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const role = localStorage.getItem("ROLE");
        updateRole(role);
        setLoading(false);

        const handleStorageChange = () => {
            updateRole(localStorage.getItem("ROLE"));
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const updateRole = (newRole) => {
        setIsEmployee(newRole?.toLowerCase() === "librarian" || newRole?.toLowerCase() === "manager");
        setIsManager(newRole?.toLowerCase() === "manager");
        setIsLoggedIn(!!newRole);
    };

    const login = () => {
        const role = localStorage.getItem("ROLE");
        updateRole(role);
    };

    const logout = () => {
        localStorage.removeItem("ROLE");
        updateRole(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isEmployee, login, logout, isLoggedIn, isManager, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};