import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import './readPost.css'

const ReadPost = () => {
  const [post, setPost] = useState({})
  const [postImage, setPostImage] = useState({})
  const [error, setError] = useState(false)

  const API = import.meta.env.VITE_REACT_APP_API_BASE_URL || '';

  const params = useParams();

  const getSinglePost = async () => {
    try {
      const response = await fetch(`${API}/posts/${params.slug}/${params.id}`)
      const data = await response.json()
      setPost(data)
    } catch (err) {
      console.error(err)
    }
  }
  const getPostImage = async () => {
    try {
      const response = await fetch(`${API}/posts/post/photo/${params.id}`)
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setPostImage(imageUrl);
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getSinglePost()
  }, [])

  useEffect(() => {
    getPostImage()
  }, [])

  return (
    <div className="post">
      {postImage && <img src={postImage} alt="Post" width='100%' />}
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  )
}

export default ReadPost