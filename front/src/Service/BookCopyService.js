export const fetchBookCopy = async (token) => {
    const response = await fetch("http://localhost:8080/api/bookcopy/available", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    if (response.ok) {
        return await response.json();
    }
    if (response.status === 403 || response.status === 401) {
        return "problem";
    }
}
export const fetchAvailableBookCopyById = async (token, id) => {
    const response = await fetch(`http://localhost:8080/api/bookcopy/available/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    if (response.ok) {
        return await response.json();
    }
    if (response.status === 403 || response.status === 401) {
        return "problem";
    }
}