import { useActionState, useEffect, useState } from "react"

const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const createPostOnSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/posts/new-post`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: `${title}`, body: `${body}` })
            })
            const data = await response.json()
            console.log(data)
        } catch (err) {
            console.error(err)
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
            {/* {result && <p>{result.message}</p>} */}
            {/* {isPending && <p>Loading ...</p>} */}
            <form>
                <h1>Add post!</h1>
                <input type="text" name="title" value={title} onChange={titleInputChange} />
                <textarea type="text" name="body" value={body} onChange={bodyInputChange}></textarea>
                <button type="submit" onClick={createPostOnSubmit}>Create</button>
            </form>
        </div>
    )
}

export default CreatePost