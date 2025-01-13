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

export const fetchAddAuthor = async (token, author) => {
    const response = await fetch("http://localhost:8080/api/authors/add", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(author)
    })
    if(response.ok){
        return await response.json();
    }
    else{
        return "problem";
    }
}