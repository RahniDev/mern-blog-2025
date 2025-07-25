import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './allPosts.css'

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([])

  const getAllPosts = async () => {
    try {
      const response = await fetch('http://localhost:8000/posts');
      const data = await response.json();
      setAllPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllPosts()
  }, [])

  return (
    <section className='all-posts'>
        {allPosts && allPosts.map((post) =>
          <Link className="grid_single-post" key={post._id} to={`/${post.slug}/${post._id}`}><div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            {post.photo && <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: 'auto' }} />}
          </div></Link>
        )}
    </section>
  )
}

export default AllPosts