import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import Avatar from "./Avatar";

import Icon_Dashboard from '../assets/icon_dashboard.svg'
import Icon_Add from '../assets/icon_add.svg';

import './Sidebar.scss'

export default function Sidebar() {
  const { user } = useAuthContext();
  const photoURL = user?.photoURL
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={photoURL} />
          <p>Greetings {user?.displayName}</p>
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