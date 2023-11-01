import Election from '../elections/election';
import Position from '../elections/positions';
import './styles/elections.css';


const Elections = () => {
  return (
    <div className="elections__container">
      <div className="content">
        <div className='election'>
        <h3 className='text-primary'>Elections</h3>
          <Election />
        </div>
        <div className='position'>
        <h1>Positions</h1>
          <Position />
        </div>
      </div>
    </div>
  );
}
 
export default Elections;