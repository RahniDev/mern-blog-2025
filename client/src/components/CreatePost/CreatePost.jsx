import { useState } from "react"
import './createPost.css'

const CreatePost = () => {
    const [values, setValues] = useState({
        title: "",
        body: "",
        photo: "",
        isPostCreated: false,
        formData: new FormData()
    })

    const {
        title,
        body,
        isPostCreated,
        formData
    } = values

    const createPostOnSubmit = async (event, post) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/posts/new-post`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: post
            })
            const data = await response.json()
            setValues({
                ...values,
                title: "",
                body: "",
                photo: "",
                isPostCreated: true,
            });
            setValues({ ...values, title: data.title, formData: new FormData() });
        } catch (err) {
            console.error(err)
        }
        if (!values.title || !values.body) {
            setValues({ isPostCreated: false })
        }
    }

    const handleChange = (name) => (event) => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        new formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    return (
        <div>
            <form id="add-post_form">
                <h1>Add post!</h1>
                <input
                    onChange={handleChange("photo")}
                    type="file"
                    name="photo"
                    accept="image/*"
                />
                <input type="text" value={title} placeholder="Title" onChange={handleChange("title")} />
                <textarea type="text" value={body} placeholder="Content" onChange={handleChange("body")}></textarea>
                <button type="submit" onClick={createPostOnSubmit}>Create</button>
            </form>
            {values.isPostCreated && <p>Your new post has been successfully published !</p>}
        </div>
    )
}

export default CreatePost