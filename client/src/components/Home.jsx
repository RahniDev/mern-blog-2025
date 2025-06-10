import Navbar from './Navbar'
import AllPosts from './AllPosts'
import CreatePost from './CreatePost'

const Home = () => {
  return (
     <div>
      <Navbar />
      <CreatePost />
      <h1>Blog</h1>
      <AllPosts />
    </div>
  )
}

export default Home