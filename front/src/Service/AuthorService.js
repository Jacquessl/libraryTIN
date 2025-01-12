export const fetchAuthors = async (token) => {
    const response = await fetch("http://localhost:8080/api/authors", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    if(response.ok){
        return await response.json();
    }

}