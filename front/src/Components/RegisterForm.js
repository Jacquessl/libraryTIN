import {useContext, useEffect, useRef, useState} from "react";
import {LanguageContext} from "../LanguageAppContext";
import {fetchRegister} from "../Service/LoginService";
import {AuthContext} from "./AuthContext";
import {useLocation, useNavigate} from "react-router-dom";

export const RegisterForm = () => {

    const {translate} = useContext(LanguageContext);
    const formRef = useRef(null);
    const {isLoggedIn} = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
        if(isLoggedIn){
            navigate("/");
        }
    }, [location]);
    async function register(event) {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        const values = Object.fromEntries(formData.entries());
        let errors = [];

        if (values.firstName.length < 2) {
            errors.push("firstNameError");
        }
        if (values.lastName.length < 2) {
            errors.push("lastNameError");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (values.email.length < 5 || !emailRegex.test(values.email)) {
            errors.push("emailError")
        }
        const passRegexUpperCase = /^(?=.*[A-Z]).+$/;

        if (values.password.length < 6) {
            errors.push("passwordErrorLessThan6")
        }
        if (!passRegexUpperCase.test(values.password)) {
            errors.push("passwordErrorUpperCase")
        }
        const passRegexNumber = /^(?=.*\d).+$/
        if (!passRegexNumber.test(values.password)) {
            errors.push("passwordErrorNumber")
        }
        if (values.password !== values.repeatPassword) {
            errors.push("repeatPasswordError")
        }
        const phoneRegex = /^(\d[\s-]?){8}\d$/;
        if (!phoneRegex.test(values.phone)) {
            errors.push("phoneError")
        }
        if(values.username.length < 4){
            errors.push("usernameError");
        }
        setErrorMessage(errors);
        values.phone = values.phone.replace(/[\s-]/g, "");
        if (errors.length === 0) {
            await fetchRegister(values).then((res) => {
                if (res === "problem") {
                    console.log("PROBLEM") //todo
                } else {
                    console.log("UDALO SIE") //todo
                }
                ;
            })
        }
    }

    return (
        <div>
            {!isLoggedIn && <div>
            <form ref={formRef} onSubmit={register}>
                <input type="text" name="firstName" placeholder={translate("firstName")}></input>
                <input type="text" name="lastName" placeholder={translate("lastName")}></input>
                <input type="email" name="email" placeholder={translate("email")}></input>
                <input type="text" name="phone" placeholder={translate("phone")}></input>
                <input type="text" name="username" placeholder={translate("username")}></input>
                <input type="password" name="password" placeholder={translate("password")}></input>
                <input type="password" name="repeatPassword" placeholder={translate("repeatPassword")}></input>
                <button type="submit"></button>
            </form>
            {errorMessage.length > 0 && errorMessage.map(errorMessage=>(<p>{translate(errorMessage)}</p>))}
            </div>
}
        </div>
    )
}