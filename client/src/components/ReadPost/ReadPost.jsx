import { useState } from "react"
import './readPost.css'

const ReadPost = () => {
const [post, setPost] = useState({})
const [error, setError] = useState(false)

  // const id = props.match.params.id

  const getSinglePost = async (slug, id) => {
    try {
      const response = await fetch(`http://localhost:8000/posts/${slug}/${id}`)
      const data = await response.json()
      setPost(data)
    } catch (err) {
      console.error(err)
    }
  }
  // useEffect(() => {
        // const slug = props.match.params.slug
        // getSinglePost(slug, id)
        //  console.log(id, slug)
  // }, [props])

 
  return (
    <div>ReadPost
     {/* {post} */}
      {/* {isAdmin && (<div><Link to="/:id">Delete Post</Link> */}
      {/* <Link to="/:id/edit">Edit Post</Link></div>)}*/}
    </div> 
  )
}

export default ReadPost