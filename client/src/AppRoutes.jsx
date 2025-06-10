import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home'
import CreatePost from './components/CreatePost'
import EditPost from './components/EditPost'
import DeletePost from './components/DeletePost'
import ReadPost from './components/ReadPost'

const AppRoutes = () => {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:slug/:id' element={<ReadPost />} />
      <Route path='/new-post/:id' element={<CreatePost />} />
      <Route path='/:id/edit' element={<EditPost />} />
      <Route path='/:id' element={<DeletePost />} />
    </Routes>
  )
}

export default AppRoutes
