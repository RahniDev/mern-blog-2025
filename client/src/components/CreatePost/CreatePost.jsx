import { useState } from "react"
import './createPost.css'

const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [isPostCreated, setIsPostCreated] = useState(false)

    const createPostOnSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/new-post`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: `${title}`, body: `${body}` })
            })
            const data = await response.json()
            setIsPostCreated(true)
        } catch (err) {
            console.error(err)
        }
       if (!title || !body) {
            setIsPostCreated(false)
        } 
    }
    
    const titleInputChange = (event) => {
        setTitle(event.target.value)
    }

    const bodyInputChange = (event) => {
        setBody(event.target.value)
    }

    return (
        <div>
            <form id="add-post_form">
                <h1>Add post!</h1>
                <input type="text" name="title" value={title} placeholder="Title" onChange={titleInputChange} />
                <textarea type="text" name="body" value={body} placeholder="Content" onChange={bodyInputChange}></textarea>
                <button type="submit" onClick={createPostOnSubmit}>Create</button>
            </form>
            {isPostCreated && <p>Your new post has been successfully published !</p>}
        </div>
    )
}

export default CreatePost