import Election from '../elections/election';
import Position from '../elections/positions';
import './styles/elections.css';


const Elections = () => {

   const capitalize = (str) => 
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="elections__container">
      <h1>Elections</h1>
      <div className="row" style={{marginTop: '3rem'}}>
        <div className="col-3">
          <Position capitalize={capitalize} />
        </div>
        <div className="col">
        <Election capitalize={capitalize} />
        </div>
      </div>
    </div>
  );
}
 
export default Elections;