import Election from '../elections/election';
import Position from '../elections/positions';
import './styles/elections.css';


const Elections = () => {
  return (
    <div className="elections__container">
      <h1>Elections</h1>
      <div className="content">
        <div className='election'>
          <Election />
        </div>
        <div className='position'>
          <Position />
        </div>
      </div>
    </div>
  );
}
 
export default Elections;