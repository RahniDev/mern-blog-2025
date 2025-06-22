import logo from '../../assets/react.svg'
import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
  return (
    <nav className='nav'>
      <a className="logo" href="/"><img src={logo} alt="" /></a>
      <ul>
        <li>
          <Link to="">Sustainable Living</Link>
        </li>
        <li>
          <Link to="">Climate Learning</Link>
        </li>
        <li>
          <Link to="">Climate News</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar