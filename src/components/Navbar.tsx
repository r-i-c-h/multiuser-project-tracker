import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { projectAuth } from '../firebase/config';
import './Navbar.scss'
import Logo from '../assets/logo.svg';

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className='navbar'>
      <ul>
        <li className="logo">
          <Link to="/" className="homelink">
            <img src={Logo} alt="App Logo" />
            <span>Horizon Key</span>
          </Link>
        </li>

        {!user && <li><Link to="/login">Login</Link></li>}
        {!user && <li><Link to="/signup">Signup </Link></li>}
        <li>
          {user && !isPending && <button className="btn" onClick={logout}>Logout</button>}
          {user && isPending && <button className="btn" disabled>Working</button>}
        </li>
      </ul>
    </nav>
  )
}