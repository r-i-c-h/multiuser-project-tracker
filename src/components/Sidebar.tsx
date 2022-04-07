import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import Avatar from "./Avatar";

import Icon_Dashboard from '../assets/icon_dashboard.svg'
import Icon_Add from '../assets/icon_add.svg';

import './Sidebar.scss'

const getTimeGreeting = () => {
  const rightNow = new Date();
  const hour = rightNow.getHours();
  if (hour === 0 || hour === 1) { return 'Buenas Noches' }
  if (hour > 1 && hour <= 11) { return 'Good Morning' }
  if (hour >= 12 && hour <= 16) { return 'Good Afternoon' }
  if (hour >= 17 && hour <= 23) { return 'Good Evening' }
  return 'Ahoy hoy'
}

export default function Sidebar() {
  const { user } = useAuthContext();
  const photoURL = user?.photoURL
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={photoURL} />
          <p>{getTimeGreeting()}, <br />{user?.displayName}</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/" exact>
                <img src={Icon_Dashboard} alt="dashboard icon" />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={Icon_Add} alt="add new project icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}