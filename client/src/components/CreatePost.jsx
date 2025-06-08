import { useActionState } from "react"

const addPost = async () => {
fetch
}

const CreatePost = () => {
    const [result, submitAction, isPending] = useActionState(
        async (previousState, formData) => {
            const title = formData.get("title")
            const body = formData.get("body")

            if (!title || !body) {
                return {
                    type: "error",
                    message: "Please add a title and a body for your post."
                }
            }

            await addPost()

            return {
                type: "success",
                message: "You have successfully posted."
            }
        },
        null
    )

    return (
        <div>
            {result && <p>{result.message}</p>}
            {isPending && <p>Loading ...</p>}
            <form action={submitAction}>
                <h1>Add post!</h1>
                <input type="text" name="title" />
                <input type="text" name="body" />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreatePost