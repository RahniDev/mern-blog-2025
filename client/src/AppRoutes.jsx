import { Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx'
import CreatePost from './components/CreatePost/CreatePost.jsx'
import EditPost from './components/EditPost/EditPost.jsx'
import ReadPost from './components/ReadPost/ReadPost.jsx'
import AdminDashboard from './components/AdminDashboard/AdminDashboard.jsx'
import AdminLogin from './components/AdminLogin/AdminLogin.jsx'
import AdminSignup from './components/AdminSignup/AdminSignup.jsx'
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx'
import AdminRoute from "./components/Auth/AdminRoute.jsx";

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
