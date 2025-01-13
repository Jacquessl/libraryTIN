import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext";
import {LanguageContext} from "../LanguageAppContext";
import {fetchReservationHistory} from "../Service/ReservationService";
import "./styles/Reservations.css"
export const ReservationHistory = () => {
    const location = useLocation();
    const {logout, isEmployee} = useContext(AuthContext);
    const {translate} = useContext(LanguageContext);
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    useEffect(() => {
        async function fetchData(token){
            await fetchReservationHistory(token).then(res => {
                if(res === "problem"){
                    logout();
                }else{
                    setReservations(res);
                }
            });
        }
        if(!isEmployee){
            navigate("/");
        }else {
            const token = localStorage.getItem("token");
            fetchData(token);
        }
    }, [location]);
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return (
        <div className="reservations-container">
            <h2 className="reservations-title">{capitalizeFirstLetter(translate("reservationHistory"))}</h2>
            <ul className="reservations-list">
                {isEmployee && reservations.map((reservation) => (
                    <li key={reservation.id} className="reservation-item">
                        <p>{reservation.user.firstName} {reservation.user.lastName}</p>
                        <p>{capitalizeFirstLetter(translate("title"))}: {reservation.bookCopy.book.title}</p>
                        <p>{capitalizeFirstLetter(translate("reservationDate"))}: {new Date(reservation.reservationDate).toLocaleDateString("pl-PL")}</p>
                        <p>{capitalizeFirstLetter(translate("status"))}: {reservation.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

}