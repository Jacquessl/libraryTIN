import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {LanguageContext} from "../LanguageAppContext";
import {AuthContext} from "./AuthContext";
import {fetchLoanHistory} from "../Service/LoanService";

export const LoanHistory = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {translate} = useContext(LanguageContext);
    const {isEmployee, logout} = useContext(AuthContext);

    useEffect(() => {
        async function fetchData(token) {
            await fetchLoanHistory(token).then(res=>console.log(res));
        }
        const token = localStorage.getItem("token");
        fetchData(token);

    }, [location])

    return (<div>helom</div>)
}