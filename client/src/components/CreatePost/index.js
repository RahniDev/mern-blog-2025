export const createPost = (token, formData) => {
    console.log(formData)
    return fetch('http://localhost:8000/posts/new-post', {
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