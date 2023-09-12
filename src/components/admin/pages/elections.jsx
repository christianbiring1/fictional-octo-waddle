import Election from '../elections/election';
import Position from '../elections/positions';
import './styles/elections.css';


const Elections = () => {
  return (
    <div className="elections__container">
      <h1>Elections</h1>
      <div className="row" style={{marginTop: '3rem'}}>
        <div className="col">
          <Election />
        </div>
        <div className="col-3">
          <Position />
        </div>
      </div>
    </div>
  );
}
 
export default Elections;