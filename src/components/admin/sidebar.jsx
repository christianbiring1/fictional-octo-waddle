import GroupsIcon from '@mui/icons-material/Groups';
import RuleIcon from '@mui/icons-material/Rule';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import HelpIcon from '@mui/icons-material/Help';
import { NavLink } from "react-router-dom";
import './sidebar.css';

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
