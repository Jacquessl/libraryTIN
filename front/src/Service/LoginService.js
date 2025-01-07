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
    if (response.ok) {
        localStorage.setItem("token", await response.text());
    }
}
