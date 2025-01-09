export const fetchCategories = async () => {
    const response = await fetch("http://localhost:8080/api/category", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });
    if (response.ok) {
        return await response.json();
    }
    if (response.status === 403 || response.status === 401) {
        return "problem";
    }
}