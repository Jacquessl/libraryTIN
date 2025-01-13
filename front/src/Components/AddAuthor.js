import {useContext, useEffect, useRef, useState} from "react";
import { LanguageContext } from "../LanguageAppContext";
import { fetchAddAuthor } from "../Service/AuthorService";
import { AuthContext } from "./AuthContext";
import {useLocation, useNavigate} from "react-router-dom";
import "./styles/AuthorStyle.css";

export const AddAuthor = () => {
    const { translate } = useContext(LanguageContext);
    const { logout, isEmployee } = useContext(AuthContext);
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [errors, setErrors] = useState([]);
    const location = useLocation();

    useEffect(()=>{
        if(!isEmployee){
            navigate("/")
        }
    },[location])
    async function addAuthor(e) {
        e.preventDefault();
        let newErrors = [];

        const formData = new FormData(formRef.current);
        const values = Object.fromEntries(formData.entries());

        if (values.firstName.length < 2) {
            newErrors.push("firstNameError");
        }
        if (values.lastName.length < 2) {
            newErrors.push("lastNameError");
        }

        setErrors(newErrors);
        if (newErrors.length === 0) {
            const token = localStorage.getItem("token");
            await fetchAddAuthor(token, values).then((res) => {
                if (res === "problem") {
                    logout();
                } else {
                    navigate("/books")
                }
            });
        }
    }

    return (
        <div>
        {isEmployee &&
        <div className="add-author-container">
            <h2 className="add-author-title">{translate("addAuthor")}</h2>
            <form ref={formRef} className="add-author-form" onSubmit={addAuthor}>
                <input type="text" name="firstName" placeholder={translate("firstName")} />
                <input type="text" name="lastName" placeholder={translate("lastName")} />
                <button type="submit" className="add-author-button">{translate("saveChanges")}</button>
            </form>
            {errors.length > 0 && (
                <div className="error-container">
                    {errors.map((error, index) => (
                        <p key={index} className="error-message">{translate(error)}</p>
                    ))}
                </div>
            )}
        </div>}</div>
    );
};
