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
export const fetchReserveBookCopy = async (token, bookCopyd) => {
    const response = await fetch(`http://localhost:8080/api/reservation/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            bookCopy: bookCopyd
        })
    });
    if (response.ok) {
        return "ok";
    }else{
        return "problem";
    }
}