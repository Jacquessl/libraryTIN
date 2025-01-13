export const fetchEmployeeMe = async (token) => {
    const response = await fetch("http://localhost:8080/api/employee/me", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    if(response.ok){
        return await response.json();
    }
    if (response.status === 403 || response.status === 401) {
        return "problem";
    }
}
export const fetchEmployeeChangePassword = async (token, password, id) => {
    const response = await fetch(`http://localhost:8080/api/employee/edit/changePassword/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            newPassword: password
        })
    });
    if(response.ok){
        return await response.json();
    }else{
        return "problem";
    }
}
export const fetchEmployeesFromApi = async (token) => {
    const response = await fetch(`http://localhost:8080/api/employee`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        return "problem";
    }
}
export const fetchAddEmploye = async (token, values) => {
    const response = await fetch(`http://localhost:8080/api/employee/add`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(values)
    });
    if(response.ok){
        return await response.json();
    }else{
        return "problem";
    }
}
export const fetchEditEmployee = async (token, value, employeeId) => {
    const response = await fetch(`http://localhost:8080/api/employee/edit/${employeeId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(value)
    });
    if(response.ok){
        return await response.json();
    }else{
        return "problem";
    }
}