import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {LanguageContext} from "../LanguageAppContext";
import {AuthContext} from "./AuthContext";
import {fetchUsersFromApi} from "../Service/UserService";
import {fetchEmployeesFromApi} from "../Service/EmployeeService";
import "./styles/userStyle.css"
export const Users = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {translate} = useContext(LanguageContext);
    const {isEmployee, logout} = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const showEmployees = location.state?.showEmployees;
    const [employees, setEmployees] = useState([]);
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
        async function fetchEmployees(token) {
            await fetchEmployeesFromApi(token).then(res=>{
                if(res==="problem"){
                    logout();
                }else{
                    setEmployees(res);
                }
            })
        }
        if(!isEmployee){
            navigate("/");
        }else {
            const token = localStorage.getItem("token");
            if (showEmployees) {
                fetchEmployees(token);
            } else {
                fetchUsers(token);
            }
        }
    }, [location])

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return (
        <div className="users-container">
            {isEmployee && !showEmployees && (
                <div>
                    <h2 className="section-title">{capitalizeFirstLetter(translate("usersList"))}</h2>
                    <button onClick={() => navigate("/addUser")}>
                        {capitalizeFirstLetter(translate("add"))}
                    </button>

                    <ul className="users-list">
                        {users.map((user) => (
                            <li key={user.userId} className="user-item">
                                <p>{user.firstName} {user.lastName}</p>
                                <p>{capitalizeFirstLetter(translate("phone"))}: {user.phone}</p>
                                <p>{capitalizeFirstLetter(translate("email"))}: {user.email}</p>
                                <p>{capitalizeFirstLetter(translate("username"))}: {user.username}</p>
                                <p>{capitalizeFirstLetter(translate("registeredDate"))}: {new Date(user.registeredDate).toLocaleDateString("pl-PL")}</p>

                                <button onClick={() => navigate("/addUser", {state: {user}})}>
                                    {capitalizeFirstLetter(translate("edit"))}
                                </button>
                                <button onClick={() => navigate("/changePassword", {state: {user}})}>
                                    {capitalizeFirstLetter(translate("changePassword"))}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {isEmployee && showEmployees && (
                <div>
                    <h2 className="section-title">{capitalizeFirstLetter(translate("employeesList"))}</h2>
                    <button onClick={() => navigate("/addUser", {state: {addEmployee: true}})}>
                        {capitalizeFirstLetter(translate("add"))}
                    </button>

                    <ul className="users-list">
                        {employees.map((employee) => (
                            <li key={employee.employeeId} className="user-item">
                                <p>{employee.firstName} {employee.lastName}</p>
                                <p>{capitalizeFirstLetter(translate("phone"))}: {employee.phone}</p>
                                <p>{capitalizeFirstLetter(translate("email"))}: {employee.email}</p>
                                <p>{capitalizeFirstLetter(translate("username"))}: {employee.username}</p>
                                <p>{capitalizeFirstLetter(translate("position"))}: {employee.position}</p>
                                <p>{capitalizeFirstLetter(translate("hireDate"))}: {new Date(employee.hireDate).toLocaleDateString("pl-PL")}</p>

                                <button onClick={() => navigate("/addUser", {state: {employee, addEmployee: true}})}>
                                    {capitalizeFirstLetter(translate("edit"))}
                                </button>
                                <button onClick={() => navigate("/changePassword", {state: {employee}})}>
                                    {capitalizeFirstLetter(translate("changePassword"))}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}