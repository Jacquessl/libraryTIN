export const fetchBooks = async () => {
    const response = await fetch("http://localhost:8080/api/books", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    });
    if (response.ok) {
        return await response.json();
    }
    if (response.status === 403 || response.status === 401) {
        return "problem";
    }
}
export const fetchBooksContaingName = async (title) => {
    const response = await fetch(`http://localhost:8080/api/books?title=${title}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    });
    if (response.ok) {
        return await response.json();
    }
    if (response.status === 403 || response.status === 401) {
        return "problem";
    }
}
export const fetchBookById = async (id) => {
    const response = await fetch(`http://localhost:8080/api/books/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    });
    if (response.ok) {
        return await response.json();
    }
    if (response.status === 403 || response.status === 401) {
        return "problem";
    }
}

