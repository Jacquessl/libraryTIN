import {useContext, useRef} from "react";
import {LanguageContext} from "../LanguageAppContext";
import {fetchRegister} from "../Service/LoginService";

export const RegisterForm = () => {

    const {translate} = useContext(LanguageContext);
    const formRef = useRef(null);

    async function register(event) {
        event.preventDefault(); // Zapobiega przeładowaniu strony

        const formData = new FormData(formRef.current);
        const values = Object.fromEntries(formData.entries()); // Pobranie wartości pól

        await fetchRegister(values).then((response)=> console.log(response));
    }

    return (
        <div>
            <form ref={formRef} onSubmit={register}>
                <input type="text" name="firstName" placeholder={translate("firstName")}></input>
                <input type="text" name="lastName" placeholder={translate("lastName")}></input>
                <input type="email" name="email" placeholder={translate("email")}></input>
                <input type="text" name="phone" placeholder={translate("phone")}></input>
                <input type="text" name="username" placeholder={translate("username")}></input>
                <input type="password" name="password" placeholder={translate("password")}></input>
                <button type="submit"></button>
            </form>
        </div>
    )
}