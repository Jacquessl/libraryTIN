import {useContext, useEffect, useRef, useState} from "react";
import {LanguageContext} from "../LanguageAppContext";
import {AuthContext} from "./AuthContext";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchRegister} from "../Service/LoginService";

export const AddUserByEmployee = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        phone: ""
    });
    const [isEdit, setIsEdit] = useState(false);
    const {translate} = useContext(LanguageContext);
    const {logout, isEmployee} = useContext(AuthContext);
    const location = useLocation();
    const user = location.state?.user;

    const navigate = useNavigate();
    const formRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState([]);
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

        if (values.password.length < 6 ) {
            errors.push("passwordErrorLessThan6")
        }
        if(!passRegexUpperCase.test(values.password)){
            errors.push("passwordErrorUpperCase")
        }
        const passRegexNumber = /^(?=.*\d).+$/
        if(!passRegexNumber.test(values.password)){
            errors.push("passwordErrorNumber")
        }
        if(values.password !== values.repeatPassword) {
            errors.push("repeatPasswordError")
        }
        const phoneRegex = /^(\d[\s-]?){8}\d$/;
        if(!phoneRegex.test(values.phone)){
            errors.push("phoneError")
        }
        if(values.username.length < 4){
            errors.push("usernameError");
        }
        setErrorMessage(errors);
        values.phone = values.phone.replace(/[\s-]/g, "");
        if (errors.length === 0) {
            await fetchRegister(values).then((res)=>{
                if(res==="problem"){
                    console.log("PROBLEM") //todo
                }else{
                    console.log("UDALO SIE") //todo
                }
            });
        }    }
    useEffect(() => {
        if(!isEmployee){
            navigate("/");
        }else{
            if(user) {
                setIsEdit(true);
                setFormData({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    username: user.username,
                    phone: user.phone
                });
            }
        }
    },[location])

    return(<div>{isEmployee && <div>

        <form ref={formRef} onSubmit={register}>
        <input type="text" name="firstName" value={formData.firstName} placeholder={translate("firstName")}></input>
        <input type="text" name="lastName" value={formData.lastName} placeholder={translate("lastName")}></input>
        <input type="text" name="email" value={formData.email} placeholder={translate("email")}></input>
        <input type="text" name="phone" value={formData.phone} placeholder={translate("phone")}></input>
        <input type="text" name="username" value={formData.username} placeholder={translate("username")}></input>
            {!isEdit && <div>
        <input type="password" name="password" placeholder={translate("password")}></input>
        <input type="password" name="repeatPassword" placeholder={translate("repeatPassword")}></input></div>}
        <button type="submit"></button>
    </form>
        {errorMessage.length > 0 && errorMessage.map(errorMessage=>(<p>{translate(errorMessage)}</p>))}

    </div>}</div>)
}