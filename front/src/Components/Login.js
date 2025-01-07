import {useContext, useState} from "react";
import {LanguageContext} from "../LanguageAppContext";
import {fetchLogin} from "../Service/LoginService";
import {fetchBooks} from "../Service/BookService";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "./AuthContext";

export const Login = () => {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const { login } = useContext(AuthContext);
    const [password, setPassword] = useState("");
    const { translate } = useContext(LanguageContext);
    const navigate = useNavigate();
    const submitLogin = async (e) => {
        e.preventDefault();
        await fetchLogin(emailOrUsername, password).then(() => {
            const payload = JSON.parse(atob(localStorage.getItem("token").split(".")[1]));
            localStorage.setItem("ROLE", payload.roles || []);
            login();
            navigate("/")
            }
        );
    }
    const handleEmailChange = (emailOrUsername) => {
        setEmailOrUsername(emailOrUsername.target.value);
    }
    const handlePasswordChange = (password) => {
        setPassword(password.target.value);
    }
    const handleClick = async () => {
        await fetchBooks(localStorage.getItem("token"));
    }
    return(
        <div>
            <form onSubmit={submitLogin}>
                <input type="emailorusername" onChange={handleEmailChange} placeholder={translate("emailorusername")} />
                <input type="password" onChange={handlePasswordChange} placeholder={translate("password")} />
                <button type="submit">{translate("login")}</button>
            </form>
            <button onClick={handleClick}>clickme</button>
        </div>
    )
}