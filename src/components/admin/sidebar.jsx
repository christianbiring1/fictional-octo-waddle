import GroupsIcon from '@mui/icons-material/Groups';
import BallotIcon from '@mui/icons-material/Ballot';
import { NavLink } from "react-router-dom";

const SideBar = () => {

  const navItem = [
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
    }
  ]
  return (
    <div>
      {navItem.map((item) => (
        <NavLink key={item.label} to={item.path}>
          {item.icon}
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}
 
export default SideBar;
