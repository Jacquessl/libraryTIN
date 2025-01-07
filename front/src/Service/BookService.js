export const fetchBooks = async () => {
    const response = await fetch("http://localhost:8080/api/books", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });
    if (response.ok) {
        return await response.json();
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
}

