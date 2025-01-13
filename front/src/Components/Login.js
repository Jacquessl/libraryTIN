import {useContext, useEffect, useState} from "react";
import {LanguageContext} from "../LanguageAppContext";
import {fetchLogin} from "../Service/LoginService";
import {useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "./AuthContext";
import "./styles/style.css"
export const Login = () => {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const { login } = useContext(AuthContext);
    const [password, setPassword] = useState("");
    const { translate } = useContext(LanguageContext);
    const navigate = useNavigate();
    const [showWrong, setShowWrong] = useState(false)
    const {isLoggedIn } = useContext(AuthContext);
    const submitLogin = async (e) => {
        e.preventDefault();
        await fetchLogin(emailOrUsername, password).then((response) => {
                if (response === "problem") {
                    setShowWrong(true);
                } else {
                    const payload = JSON.parse(atob(localStorage.getItem("token").split(".")[1]));
                    localStorage.setItem("ROLE", payload.roles || []);
                    login();
                    navigate("/")
                    setShowWrong(false);
                }
            }
        );
    }

    useEffect(() => {
        if(isLoggedIn) {
            navigate("/");
        }
    })

    const handleEmailChange = (emailOrUsername) => {
        setEmailOrUsername(emailOrUsername.target.value);
    }
    const handlePasswordChange = (password) => {
        setPassword(password.target.value);
    }
    return (
        <div className="login-container">
            {!isLoggedIn && (
                <div>
                    <h2 className="login-title">{translate("login")}</h2>
                    <form className="login-form" onSubmit={submitLogin}>
                        <input
                            type="text"
                            onChange={handleEmailChange}
                            placeholder={translate("emailorusername")}
                        />
                        <input
                            type="password"
                            onChange={handlePasswordChange}
                            placeholder={translate("password")}
                        />
                        <button className="login-button" type="submit">
                            {translate("login")}
                        </button>
                    </form>
                    {showWrong && <span className="login-error">{translate("wrongUsernameOrPassword")}</span>}
                    <span className="register-link" onClick={() => navigate("/addUser")}>
                    {translate("dontHaveAccountYet?")}
                </span>
                </div>
            )}
        </div>
    );

}