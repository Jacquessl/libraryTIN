import {useContext} from "react";
import {AuthContext} from "./AuthContext";
import {ManagerNavbar} from "./ManagerNavbar";

export const EmployeeNavbar = () => {
    const {isManager} = useContext(AuthContext);

    return (<div>{isManager && <ManagerNavbar/>}
        <ul>
            <li>Users</li>
            <li>Reservations</li>
            <li></li>
        </ul>
    </div>)
}