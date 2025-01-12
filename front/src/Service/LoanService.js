export const fetchLoansFromApi = async (token) => {
    const response = await fetch("http://localhost:8080/api/loan", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    })
    if(response.ok){
        return await response.json();
    }else{
        return "problem";
    }
}
export const fetchExtendDueDate = async (token, id) => {
    const response = await fetch(`http://localhost:8080/api/loan/edit/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    })
    if(response.ok){
        return await response.json();
    }
}
export const fetchReturnBook = async (token, id) => {
    const response = await fetch(`http://localhost:8080/api/loan/return/${id}`, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    if(response.ok){
        return await response.json();
    }
}

export const fetchCreateLoan = async (token, reservation) => {
    const response = await fetch(`http://localhost:8080/api/loan/add`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            reservationId: reservation.id,
            userId: reservation.user.userId,
            bookCopyId: reservation.bookCopy.copyId
        })
    })
    if(response.ok){
        return await response.json();
    }
}

export const fetchLoanHistory = async (token) => {
    const response = await fetch("http://localhost:8080/api/loan/history", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });

    if(response.ok){
        return await response.json();
    }
}