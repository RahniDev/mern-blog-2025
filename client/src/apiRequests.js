const id = "ugysh"
export const addPost = (id) => {
    return fetch(`http://localhost:8000/posts/new-post/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React Hooks POST Request Example', body: "fstgbjhds"})
    })
        .then((response) => {
            console.log(response.json())
        })
        .catch((err) => console.log(err));
}