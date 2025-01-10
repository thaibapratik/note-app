import { fetchData } from "./FetchData.js";

export const getNotes = async () => {
    const response = await fetchData("/api/notes", {method: "GET"});
    return response;
}

export const createNote = async ({title, body}) => {
    const response = await fetchData("/api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({title, body}),
    });
    return response;
}

export const deleteNote = async (id) => {
    try {
        const response = await fetch(`/api/notes/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Error deleting note: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error("Error in deleteNote:", error.message);
        throw error;
    }
};


export const updateNote = async (id, {title, body}) => {
    const response = await fetchData(`/api/notes/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({title, body}),
    })
}


