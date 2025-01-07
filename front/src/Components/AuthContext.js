import {createContext, useEffect, useState} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isEmployee, setIsEmployee] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isManager, setIsManager] = useState(false);

    useEffect(() => {
        updateRole(localStorage.getItem("ROLE"));

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
        if(newRole){
            setIsLoggedIn(true)
        }
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
        <AuthContext.Provider value={{ isEmployee, login, logout, isLoggedIn, isManager }}>
            {children}
        </AuthContext.Provider>
    );
};