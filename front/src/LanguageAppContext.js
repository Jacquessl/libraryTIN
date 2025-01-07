import pl from "./Translations/pl.json"
import en from "./Translations/en.json"
import {createContext, useEffect, useState} from "react";

const translations = {pl, en};

export const LanguageContext = createContext();

export const LangugeProvider = ({ children }) => {
    const [lang, setLang] = useState(localStorage.getItem("lang") || "pl");
    useEffect(() => {
        localStorage.setItem("lang", lang);
    }, [lang]);

    const translate = (key) => translations[lang][key] || key;

    return (
        <LanguageContext.Provider value={{lang, setLang, translate}}>
            {children}
        </LanguageContext.Provider>
    );
}