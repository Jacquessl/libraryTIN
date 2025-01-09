import pl from "./Translations/pl.json"
import gb from "./Translations/gb.json"
import {createContext, useEffect, useState} from "react";

const translations = {pl, gb};

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