import {useContext} from "react";
import {AuthContext} from "./AuthContext";

export const EmployeeNavbar = () => {
    const {isManager} = useContext(AuthContext);

    return (<div>{isManager? <manager/> : <div/>}
    </div>)
}