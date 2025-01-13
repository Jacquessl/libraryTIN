import {useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext";
import {useLocation, useNavigate} from "react-router-dom";
import {LanguageContext} from "../LanguageAppContext";
import {fetchExtendDueDate, fetchLoansFromApi, fetchReturnBook} from "../Service/LoanService";
import "./styles/Loans.css"
export const Loans = () => {
    const {isEmployee, logout} = useContext(AuthContext);
    const location = useLocation();
    const {translate} = useContext(LanguageContext);
    const navigate = useNavigate();
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        async function fetchLoans(token) {
            await fetchLoansFromApi(token).then(res=> {
                if(res==="problem"){
                    logout();
                }else{
                    setLoans(res);
                }
            });
        }
        if(isEmployee) {
            const token = localStorage.getItem("token");
            fetchLoans(token);
        }else{
            navigate("/");
        }
    },[location]);
    async function extendDueDate(id) {
        const token = localStorage.getItem("token");
        await fetchExtendDueDate(token, id).then(async res => {
            if (res === "problem") {
                logout()
            } else {
                await fetchLoansFromApi(token).then(res => {
                    if (res === "problem") {
                        logout();
                    } else {
                        setLoans(res);
                    }
                });
            }
        })
    }
    async function returnBook(id) {
        const token = localStorage.getItem("token");
        await fetchReturnBook(token, id).then(async res => {
            if (res === "problem") {
                logout()
            } else {
                await fetchLoansFromApi(token).then(res => {
                    if (res === "problem") {
                        logout();
                    } else {
                        setLoans(res);
                    }
                });
            }
        });
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return (
        <div className="loans-container">
            <h2 className="loans-title">{capitalizeFirstLetter(translate("loans"))}</h2>
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
                        <button onClick={() => extendDueDate(loan.id)}>{translate("extend")}</button>
                        <button onClick={() => returnBook(loan.id)}>{translate("return")}</button>
                    </li>
                ))}
            </ul>
            <button className="history-button" onClick={() => navigate("/loanHistory")}>
                {capitalizeFirstLetter(translate("history"))}
            </button>
        </div>
    );

}