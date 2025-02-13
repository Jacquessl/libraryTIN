import {useContext, useEffect, useRef, useState} from "react";
import {EmployeeNavbar} from "./EmployeeNavbar";
import {NotLoggedInNavbar} from "./NotLoggedInNavbar";
import {AuthContext} from "./AuthContext";
import {LanguageContext} from "../LanguageAppContext";
import {AllExceptEmployeesNavbar} from "./AllExceptEmployeesNavbar";
import {useLocation, useNavigate} from "react-router-dom";
import './styles/style.css';
import { FaUserCircle } from "react-icons/fa"

export const Navbar = () => {
    const navigate = useNavigate();
    const { isEmployee, isLoggedIn, login, logout } = useContext(AuthContext);
    const { translate, setLang, lang } = useContext(LanguageContext);
    const location = useLocation();
    const [flag, setFlag] = useState(`https://flagcdn.com/w40/${lang}.png`);
    const [showLogout, setShowLogout] = useState(false);
    const profileRef = useRef(null);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    useEffect(() => {
        if(lang === "pl"){
            setFlag(`https://flagcdn.com/w40/gb.png`)
        }else{
            setFlag(`https://flagcdn.com/w40/pl.png`)
        }
    }, [location]);
    useEffect(() => {
        login()
    }, [])
    const handleClickOutside = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            setShowLogout(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (<div>
    <div className="language-container">
        <span className="library-name">{translate("cityLibrary")}</span>
        <ul className="navbar">
            <li className="language-switch" onClick={() => {
                if (localStorage.getItem("lang") === "pl") {
                    setLang("gb");
                    setFlag(`https://flagcdn.com/w40/pl.png`);
                } else {
                    setLang("pl");
                    setFlag(`https://flagcdn.com/w40/gb.png`);
                }
            }}><span><img src={flag} width="30"/></span></li>
        </ul>
    </div>
        <div className="navbar-container">
            {isEmployee ? <EmployeeNavbar/> : isLoggedIn ? <div><AllExceptEmployeesNavbar/>

                </div>
                : <NotLoggedInNavbar/>}
            {isLoggedIn && (
                <ul className="navbar">
                    {!isEmployee && <li onClick={()=>{setShowLogout(false); navigate("/bookCopy")}}>{capitalizeFirstLetter(translate("reserve"))}</li>
                    }<div className="user-profile-container" ref={profileRef}>

                    <li className="user-profile"
                        onMouseEnter={() => setShowLogout(true)}
                        onClick={() => navigate("/profile")}>
                        <FaUserCircle className="profile-icon"/>
                        <span>{capitalizeFirstLetter(translate("profile"))}</span>
                    </li>
                    {showLogout && (
                        <button className="logout-button" onClick={() => logout()}>
                            Logout
                        </button>
                    )}
                    </div>
                </ul>
            )}
        </div>
        </div>
        )
        }