export const fetchUserMe = async (token) => {
    const response = await fetch("http://localhost:8080/api/user/me", {
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

export const fetchUsersFromApi = async (token) => {
    const response = await fetch(`http://localhost:8080/api/user`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    if(response.ok) {
        return await response.json();
    }
    else{
        return "problem";
    }
}

export const fetchEditUser = async (token, values, id) => {
    const response = await fetch(`http://localhost:8080/api/user/edit/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(values)
    })
    if(response.ok){
        return await response.json();
    }else{
        return "problem";
    }
}

export const fetchChangeUserPassword = async (token, values, id) => {
    const response = await fetch(`http://localhost:8080/api/user/edit/changePassword/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            newPassword: values
        })
    });
    if(response.ok){
        return await response.json();
    }else{
        return "problem";
    }
}

export const fetchUserDelete = async (token, id) => {
    const response = await fetch(`http://localhost:8080/api/user/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    if(response.ok){
        return response;
    }else{
        return "problem"
    }
}