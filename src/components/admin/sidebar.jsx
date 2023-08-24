import GroupsIcon from '@mui/icons-material/Groups';
import BallotIcon from '@mui/icons-material/Ballot';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { NavLink } from "react-router-dom";
import './sidebar.css'

const SideBar = () => {

  const navItem = [
    {
      path: '/',
      label: 'Dashboard',
      icon: <DashboardIcon />
    },
    {
      path: '/elections',
      label: 'Elections',
      icon: <BallotIcon />
    },
    {
      path: '/candidates',
      label: 'Candidates',
      icon: <GroupsIcon />
    },
    {
      path: '/electors',
      label: 'Electors',
      icon: <GroupsIcon />
    },
    {
      path: '/results',
      label: 'Results',
      icon: <GroupsIcon />
    },
    {
      path: '/admin_login',
      label: 'Logout',
      icon: <ExitToAppIcon />
    }
  ]
  return (
    <div className='nav-bar'>
      <h1 className='header'>My App</h1>
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
 
export default SideBar;
