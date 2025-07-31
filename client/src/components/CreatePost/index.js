const API = import.meta.env.VITE_REACT_APP_API_BASE_URL || '';
export const createPost = (token, formData) => {
    console.log(formData)
    return fetch(`${API}/posts/new-post`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.error(err);
        });
};