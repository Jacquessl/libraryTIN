import {useContext, useEffect, useRef, useState} from "react";
import {LanguageContext} from "../LanguageAppContext";
import {fetchLogin} from "../Service/LoginService";
import {useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "./AuthContext";

export const Login = () => {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const { login } = useContext(AuthContext);
    const [password, setPassword] = useState("");
    const { translate } = useContext(LanguageContext);
    const navigate = useNavigate();
    const [showWrong, setShowWrong] = useState(false)
    const {isLoggedIn } = useContext(AuthContext);
    const location = useLocation();
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
    return(<div>
        {!isLoggedIn &&
    <div>

        <form onSubmit={submitLogin}>
            <input type="emailorusername" onChange={handleEmailChange} placeholder={translate("emailorusername")}/>
            <input type="password" onChange={handlePasswordChange} placeholder={translate("password")}/>
            <button type="submit">{translate("login")}</button>
        </form>
        {showWrong &&
            <span>{translate("wrongUsernameOrPassword")}<br/></span>}
        <span onClick={() => navigate("/register")}>{translate("dontHaveAccountYet?")}</span>
    </div>
}</div>
    )
}