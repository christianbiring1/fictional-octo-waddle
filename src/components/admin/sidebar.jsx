import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import GroupsIcon from '@mui/icons-material/Groups';
import RuleIcon from '@mui/icons-material/Rule';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import HelpIcon from '@mui/icons-material/Help';
import './sidebar.css';
import _ from "lodash";

const SideBar = ({ user }) => {

  const navItem = [
    {
      path: '/',
      label: 'Dashboard',
      icon: <DashboardIcon />
    },
    {
      path: '/elections',
      label: 'Elections',
      icon: <RuleIcon />
    },
    {
      path: '/candidates',
      label: 'Candidates',
      icon: <GroupsIcon />
    },
    {
      path: '/electors',
      label: 'Electors',
      icon: <LocalLibraryIcon />
    },
    {
      path: '/results',
      label: 'Results',
      icon: <CheckCircleOutlineIcon />
    },
    {
      path: '/guidelines',
      label: 'Guidelines',
      icon: <HelpIcon />
    },
    {
      path: '/admin_logout',
      label: 'Logout',
      icon: <ExitToAppIcon />
    }
  ]
  return (
    <div className='nav-bar'>
      <h1 className='header'>E-Vote</h1>
      <h5>Welcome to e-voty!</h5>
      <div className="hero">
        <p>You are connected as</p>
        <p className="name">{_.capitalize(user.name)}</p>
      </div>
      {navItem.map((item) => (
        <NavLink key={item.label} to={item.path}>
          <ul className='navbar__list'>
            <li className='nav__item'>
              <span className='icon'>{item.icon}</span>
              <span className='label'>{item.label}</span>
            </li>
          </ul>
        </NavLink>
      ))}
    </div>
  );
}
 
SideBar.propTypes = {
  user: PropTypes.object.isRequired
}
export default SideBar;
