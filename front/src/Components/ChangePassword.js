import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useRef, useState} from "react";
import {LanguageContext} from "../LanguageAppContext";
import {fetchEmployeeChangePassword} from "../Service/EmployeeService";
import {fetchChangeUserPassword} from "../Service/UserService";
import {AuthContext} from "./AuthContext";
import "./styles/userStyle.css"
export const ChangePassword = () =>{
    const location = useLocation();
    const user = location.state?.user;
    const employee = location.state?.employee;
    const [errorMessage, setErrorMessage] = useState([]);
    const formRef = useRef(null);
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();
    const {translate} = useContext(LanguageContext);
    async function changePassword(e) {
        e.preventDefault();
        let errors = [];
        const formData = new FormData(formRef.current);
        const values = Object.fromEntries(formData.entries());
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
        setErrorMessage(errors)
        if (errors.length === 0) {
            const token = localStorage.getItem("token");
            if(user){
                await fetchChangeUserPassword(token, values.password, user.userId).then(res=>{
                    if(res==="problem"){
                        logout();
                    }else{
                        navigate("/")
                    }

                })
            }else{
                await fetchEmployeeChangePassword(token, values.password, employee.employeeId).then(res=>{
                    if(res==="problem"){
                        logout();
                    }else{
                        navigate("/")
                    }
                });
            }
        }
    }

    return (
        <div className="change-password-container">
            <h2 className="change-password-title">{translate("changePassword")}</h2>
            <form className="change-password-form" ref={formRef} onSubmit={changePassword}>
                <input type="password" name="password" placeholder={translate("password")} />
                <input type="password" name="repeatPassword" placeholder={translate("repeatPassword")} />
                <button type="submit" className="change-password-button">{translate("confirmChange")}</button>
            </form>
            {errorMessage.length > 0 && (
                <div className="error-container">
                    {errorMessage.map((error, index) => (
                        <p key={index} className="error-message">{translate(error)}</p>
                    ))}
                </div>
            )}
        </div>
    );
}