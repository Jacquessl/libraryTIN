import { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../LanguageAppContext";
import { AuthContext } from "./AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchRegister } from "../Service/LoginService";
import { fetchEditUser } from "../Service/UserService";
import { fetchAddEmploye, fetchEditEmployee } from "../Service/EmployeeService";
import "./styles/userStyle.css";
export const AddUserByEmployee = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        phone: "",
        password: "",
        repeatPassword: "",
        position: ""
    });

    const [isEdit, setIsEdit] = useState(false);
    const { translate } = useContext(LanguageContext);
    const { logout, isEmployee } = useContext(AuthContext);
    const location = useLocation();
    const user = location.state?.user;
    const employee = location.state?.employee;
    const addEmployee = location.state?.addEmployee;

    const navigate = useNavigate();
    const formRef = useRef(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            setIsEdit(true);
            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                phone: user.phone
            });
        }
        if (employee) {
            setIsEdit(true);
            setFormData({
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                username: employee.username,
                phone: employee.phone,
                position: employee.position
            });
        }
    }, [location]);

    const validateForm = () => {
        let newErrors = {};

        if (formData.firstName.length < 2) {
            newErrors.firstName = "firstNameError";
        }
        if (formData.lastName.length < 2) {
            newErrors.lastName = "lastNameError";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email.length < 5 || !emailRegex.test(formData.email)) {
            newErrors.email = "emailError";
        }
        if (!isEdit) {
            const passRegexUpperCase = /^(?=.*[A-Z]).+$/;
            if (formData.password.length < 6) {
                newErrors.password = "passwordErrorLessThan6";
            }
            if (!passRegexUpperCase.test(formData.password)) {
                newErrors.passwordUpperCase = "passwordErrorUpperCase";
            }
            const passRegexNumber = /^(?=.*\d).+$/;
            if (!passRegexNumber.test(formData.password)) {
                newErrors.passwordNumber = "passwordErrorNumber";
            }
            if (formData.password !== formData.repeatPassword) {
                newErrors.repeatPassword = "repeatPasswordError";
            }
        }
        if (addEmployee && !formData.position) {
            newErrors.position = "positionError";
        }
        const phoneRegex = /^(\d[\s-]?){8}\d$/;
        if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "phoneError";
        }
        if (formData.username.length < 4) {
            newErrors.username = "usernameError";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    async function register(event) {
        event.preventDefault();
        if (!validateForm()) return;

        const token = localStorage.getItem("token");
        const values = { ...formData, phone: formData.phone.replace(/[\s-]/g, "") };

        if (isEdit) {
            if (!addEmployee) {
                await fetchEditUser(token, values, user.userId).then((res) => {
                    if (res === "problem") {
                        logout();
                    } else {
                        navigate(isEmployee ? "/users" : "/profile");
                    }
                });
            } else {
                await fetchEditEmployee(token, values, employee.employeeId).then((res) => {
                    if (res === "problem") {
                        logout();
                    } else {
                        navigate(isEmployee ? "/users" : "/profile", { state: { showEmployees: true } });
                    }
                });
            }
        } else {
            if (!addEmployee) {
                await fetchRegister(values).then((res) => {
                    if (res === "problem") {
                        let nerrors = [];

                        nerrors.username = "repeatUsernameError"
                        nerrors.email = "repeatUsernameError"
                        setErrors(nerrors);
                    } else {
                        navigate(isEmployee ? "/users" : "/profile");
                    }
                });
            } else {
                await fetchAddEmploye(token, values).then((res) => {
                    if (res === "problem") {
                        let nerrors = [];
                        nerrors.username = "repeatUsernameError" //to bedzie username lub email taki sam
                        nerrors.email = "repeatUsernameError" //to bedzie username lub email taki sam


                        setErrors(nerrors);
                    } else {
                        navigate(isEmployee ? "/users" : "/profile", { state: { showEmployees: true } });
                    }
                });
            }
        }
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return (
        <div className="add-user-container">
            <h2 className="add-user-title">{capitalizeFirstLetter(translate(isEdit ? addEmployee ? "editEmployee" : "editUser" : addEmployee ? "addEmployee" : "addUser"))}</h2>
            <form ref={formRef} onSubmit={register}>
                <label>
                    {translate("firstName")}:
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                    {errors.firstName && <span className="error">{translate(errors.firstName)}</span>}
                </label>

                <label>
                    {translate("lastName")}:
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                    {errors.lastName && <span className="error">{translate(errors.lastName)}</span>}
                </label>

                <label>
                    {translate("email")}:
                    <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
                    {errors.email && <span className="error">{translate(errors.email)}</span>}
                </label>

                <label>
                    {translate("phone")}:
                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                    {errors.phone && <span className="error">{translate(errors.phone)}</span>}
                </label>

                <label>
                    {translate("username")}:
                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
                    {errors.username && <span className="error">{translate(errors.username)}</span>}
                </label>

                {addEmployee && (
                    <label className="position-select">
                        {translate("position")}:
                        <select name="position" value={formData.position} onChange={handleInputChange}>
                            <option value="">{translate("choosePosition")}</option>
                            <option value="Librarian">{translate("librarian")}</option>
                            <option value="Manager">{translate("manager")}</option>
                        </select>
                        {errors.position && <span className="error">{translate(errors.position)}</span>}
                    </label>
                )}

                {!isEdit && (
                    <>
                        <label>
                            {translate("password")}:
                            <input type="password" name="password" onChange={handleInputChange} />
                            {errors.password && <span className="error">{translate(errors.password)}</span>}
                            {errors.passwordUpperCase && <span className="error">{translate(errors.passwordUpperCase)}</span>}
                            {errors.passwordNumber && <span className="error">{translate(errors.passwordNumber)}</span>}
                        </label>

                        <label>
                            {translate("repeatPassword")}:
                            <input type="password" name="repeatPassword" onChange={handleInputChange} />
                            {errors.repeatPassword && <span className="error">{translate(errors.repeatPassword)}</span>}
                        </label>
                    </>
                )}

                <button type="submit">{capitalizeFirstLetter(translate("saveChanges"))}</button>
            </form>
        </div>
    );

};
