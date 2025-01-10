export const fetchData = async (url, init) => {
    try {
        const response = await fetch(url, init);
        if (response.ok) {
            return await response.json();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'An error occurred');
        }
    } catch (error) {
        throw error;
    }
};

