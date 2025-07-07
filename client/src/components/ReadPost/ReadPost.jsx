import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import './readPost.css'

const ReadPost = () => {
  const [post, setPost] = useState({})
  const [error, setError] = useState(false)

  const params = useParams();

  const getSinglePost = async () => {
    try {
      const response = await fetch(`http://localhost:8000/posts/${params.slug}/${params.id}`)
      const data = await response.json()
      setPost(data)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    getSinglePost()
  }, [])
  return (
    <div className="post">
     <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  )
}

export default ReadPost