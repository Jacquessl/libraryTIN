import {useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext";
import {useLocation, useNavigate} from "react-router-dom";
import {LanguageContext} from "../LanguageAppContext";
import {fetchCancelReservation, fetchReservationsFromApi} from "../Service/ReservationService";
import {fetchCreateLoan} from "../Service/LoanService";

export const Reservations = () => {
    const {isEmployee, logout} = useContext(AuthContext);
    const location = useLocation();
    const {translate} = useContext(LanguageContext);
    const [reservations, setReservations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchReservations(token) {
            await fetchReservationsFromApi(token).then(res=> {
                if(res==="problem"){
                    logout();
                }
                else {
                    setReservations(res);
                }
            });
        }
        if(isEmployee) {
            const token = localStorage.getItem("token");
            fetchReservations(token);
        }else{
            navigate("/");
        }
    }, [location])

    async function createLoan(reservation) {
        const token = localStorage.getItem("token");
        await fetchCreateLoan(token, reservation).then(async res => {
            if (res === "problem") {
                logout()
            } else {
                await fetchReservationsFromApi(token).then(res => {
                    if (res === "problem") {
                        logout();
                    } else {
                        setReservations(res);
                    }
                });
            }
        });
    }

    async function cancelReservation(id) {
        const token = localStorage.getItem("token");
        await fetchCancelReservation(token, id).then(async res => {
            if (res === "problem") {
                logout()
            } else {
                await fetchReservationsFromApi(token).then(res => {
                    if (res === "problem") {
                        logout();
                    } else {
                        setReservations(res);
                    }
                });
            }
        });
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return(<div>
        <ul>{isEmployee && reservations.map((reservation)=>(
        <li key={reservation.id}>
            <p>{reservation.user.firstName} {reservation.user.lastName}</p>
            <p>{capitalizeFirstLetter(translate("title"))}: {reservation.bookCopy.book.title}</p>
            <p>{capitalizeFirstLetter(translate("reservationDate"))}: {new Date(reservation.reservationDate).toLocaleDateString("pl-PL")}</p>
            <p>{capitalizeFirstLetter(translate("status"))}: {reservation.status}</p>
            <button onClick={() => createLoan(reservation)}>{translate("loan")}</button>
            <button onClick={()=>cancelReservation(reservation.id)}>{translate("cancel")}</button>
        </li>
        ))}
        </ul>
    <button onClick={()=>navigate("/reservationHistory")}></button></div>)
}