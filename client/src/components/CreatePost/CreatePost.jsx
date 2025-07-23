import { useState } from "react"
import './createPost.css'
import { isAuthenticated } from "../Auth/index";
import { createPost } from "./index"

const CreatePost = () => {
    const [values, setValues] = useState({
        title: "",
        body: "",
        photo: "",
        isPostCreated: false,
        formData: new FormData()
    })
    const { user, token } = isAuthenticated();
    const {
        title,
        body,
        photo,
        isPostCreated,
        formData
    } = values

    const createPostOnSubmit = e => {
        e.preventDefault();
            setValues({ ...values, error: "" });
        createPost(token, formData).then((error) => {
            if (error) {
                setValues({ ...values, error: error });
            } else {
                setValues({
                    ...values,
                    title: "",
                    body: "",
                    photo: "",
                    isPostCreated: true,
                });
                setValues({ ...values, formData: new FormData() });
            }
        });
    };

    const handleChange = (name) => (event) => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    return (
        <>
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
        </>
    )
}

export default CreatePost