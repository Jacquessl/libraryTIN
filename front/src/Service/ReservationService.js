export const fetchReservationsFromApi = async (token) => {
    const response = await fetch("http://localhost:8080/api/reservation", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    if(response.ok){
        return await response.json();
    }else{
        return "problem";
    }
}
export const fetchCancelReservation = async (token, id) => {
    const response = await fetch(`http://localhost:8080/api/reservation/edit/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify("Cancelled")})
    if(response.ok){
        return await response.json();
    }else{
        return "problem"
    }
}
export const fetchReservationHistory = async (token) => {
    const response = await fetch("http://localhost:8080/api/reservation/history", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    if(response.ok){
        return await response.json();
    }
}