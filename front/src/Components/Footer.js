import {useContext} from "react";
import {LanguageContext} from "../LanguageAppContext";

export const Footer = () => {
    const {translate} = useContext(LanguageContext)
    return(
        <footer className="footer-container">
            <p>📚 {translate("cityLibrary")} &copy; {new Date().getFullYear()} - All rights reserved.</p>
        </footer>
    )
}