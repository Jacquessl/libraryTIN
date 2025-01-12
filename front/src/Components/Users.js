import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {LanguageContext} from "../LanguageAppContext";
import {AuthContext} from "./AuthContext";
import {fetchUsersFromApi} from "../Service/UserService";

export const Users = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {translate} = useContext(LanguageContext);
    const {isEmployee, logout} = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers(token) {

            await fetchUsersFromApi(token).then((res) => {
                if(res==="problem"){
                    logout();
                }else{
                    setUsers(res);
                }
            });
        }
        if(!isEmployee){
            navigate("/");
        }else {
            const token = localStorage.getItem("token");
            fetchUsers(token);
        }
    }, [location])

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return(<div>
        {isEmployee && <div> <button onClick={()=>navigate("/addUser")}>add</button>
        <ul>
            {isEmployee && users.map((user) => (
                <li key={user.userId}>
                    {user.firstName} {user.lastName}
                    <p>{capitalizeFirstLetter(translate("phone"))}: {user.phone}</p>
                    <p>{capitalizeFirstLetter(translate("email"))}: {user.email}</p>
                    <p>{capitalizeFirstLetter(translate("username"))}: {user.username}</p>
                    <p>{capitalizeFirstLetter(translate("registeredDate"))}: {new Date(user.registeredDate).toLocaleDateString("pl-PL")}</p>
                    <button onClick={()=>navigate("/addUser", {state:{user:user}})}></button>
                </li>
            ))}
        </ul></div>}
    </div>)
}