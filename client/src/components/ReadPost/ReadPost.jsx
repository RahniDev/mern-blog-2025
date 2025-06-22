import { useState, useEffect, useContext } from "react"
import './readPost.css'
import { ThemeContext } from '../../contexts.js';

const ReadPost = () => {
  const [post, setPost] = useState({})
  const [error, setError] = useState(false)

  const theme = useContext(ThemeContext);

  // const getSinglePost = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/posts/${post.slug}/${post._id}`)
  //     const data = await response.json()
  //     setPost(data)
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }
  // useEffect(() => {
  //   getSinglePost()
  // }, [])
      console.log(theme)
  return     <ThemeContext value={theme}>Theme</ThemeContext>
  // return (
  //   <div>
      
  //   </div>
  // )
}

export default ReadPost