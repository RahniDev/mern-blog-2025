import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
  return (
    <nav className='nav'>
      <a className="logo" href="/"><img src={logo} alt="Yuzu Wellness Logo"
      width="80px" /></a>
      <ul>
        <li>
          <Link to="">DIY Recipes</Link>
        </li>
        <li>
          <Link to="">Wellness</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar