import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {LanguageContext} from "../LanguageAppContext";
import {AuthContext} from "./AuthContext";
import {fetchLoanHistory} from "../Service/LoanService";
import "./styles/Loans.css"
export const LoanHistory = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {translate} = useContext(LanguageContext);
    const {isEmployee, logout} = useContext(AuthContext);
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        async function fetchData(token) {
            await fetchLoanHistory(token).then(res=> {
                if(res==="problem"){
                    logout();
                }else{
                    setLoans(res);
                }
            });
        }
        if(isEmployee) {
            const token = localStorage.getItem("token");
            fetchData(token);
        }else{
            navigate("/");
        }

    }, [location])
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return (
        <div className="loans-container">
            <h2 className="loans-title">{capitalizeFirstLetter(translate("loanHistory"))}</h2>
            <ul className="loans-list">
                {isEmployee && loans.map((loan) => (
                    <li key={loan.id} className="loan-item">
                        <p>{loan.user.firstName} {loan.user.lastName}</p>
                        <p>{capitalizeFirstLetter(translate("book"))}: {loan.bookCopy.book.title}</p>
                        <p>{capitalizeFirstLetter(translate("loanDate"))}: {new Date(loan.loanDate).toLocaleDateString("pl-PL")}</p>
                        <p>{capitalizeFirstLetter(translate("dueDate"))}: {new Date(loan.dueDate).toLocaleDateString("pl-PL")}</p>
                        {loan.returnDate && (
                            <p>{capitalizeFirstLetter(translate("returnDate"))}: {new Date(loan.returnDate).toLocaleDateString("pl-PL")}</p>
                        )}
                        <p>{capitalizeFirstLetter(translate("employee"))}: {loan.employee.firstName} {loan.employee.lastName}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

}