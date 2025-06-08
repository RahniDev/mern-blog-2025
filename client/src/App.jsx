import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import AllPosts from './components/AllPosts'
import './App.css'

function App() {

  return (
    <div>
      <Navbar />
      <h1>Blog</h1>
      <AllPosts />
    </div>
  )
}

export default App
