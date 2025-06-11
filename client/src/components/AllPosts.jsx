import { useState, useEffect } from 'react'

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([])

  const getAllPosts = async () => {
    try {
      const response = await fetch('http://localhost:8000/posts/', {
        method: 'GET'
      });
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
    <>
      {allPosts && allPosts.map((post) => 
      <div key={post._id}><h2>{post.title}</h2>
        <p>{post.body}</p>
        </div>
      )}
    </>
  )
}

export default AllPosts