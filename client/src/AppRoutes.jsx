import { Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import CreatePost from './components/CreatePost/CreatePost'
import EditPost from './components/EditPost/EditPost'
import ReadPost from './components/ReadPost/ReadPost'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import AdminLogin from './components/AdminLogin/AdminLogin'
import AdminSignup from './components/AdminSignup/AdminSignup'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer'
import AdminRoute from "./components/Auth/AdminRoute";

const AppRoutes = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:slug/:id' element={<ReadPost />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        {/* only authenticated admin can access */}
        <Route path='/new-post' element={<AdminRoute><CreatePost /></AdminRoute>} />
        <Route path='/:slug/:id/edit' element={<AdminRoute><EditPost /></AdminRoute>} />
        <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      </Routes>
      <Footer />
    </>
  )
}

export default AppRoutes
