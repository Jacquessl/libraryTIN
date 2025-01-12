export const fetchLogin = async (identifier, password) => {
    const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            identifier: identifier,
            password: password
        })
    });
    const text = await response.text();
    if(response.ok && text === "wrong username or password") {
        return "problem"
    }
    if (response.ok) {
        localStorage.setItem("token", text);
    }
}

export const fetchRegister = async (values) => {
    const response = await fetch("http://localhost:8080/api/user/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(values)
    })
    if(response.ok) {
        return await response.json();
    }else{
        return "problem";
    }
}
