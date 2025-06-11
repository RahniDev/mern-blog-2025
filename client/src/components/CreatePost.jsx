import { useActionState, useEffect } from "react"

const CreatePost = () => {

 async function createPostOnSubmit() {
       const response = await fetch(`http://localhost:8000/posts/new-post`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React Tgyu totally Example', body: "fstgbjhds" })
        })
            .then(() => {
                console.log(response.json())
            })
            .catch((err) => console.log(err));
    }

    return (
        <div>
            {/* {result && <p>{result.message}</p>} */}
            {/* {isPending && <p>Loading ...</p>} */}
            <form>
                <h1>Add post!</h1>
                <input type="text" name="title" />
                <input type="text" name="body" />
                <button type="submit" onClick={createPostOnSubmit}>Create</button>
            </form>
        </div>
    )
}

export default CreatePost