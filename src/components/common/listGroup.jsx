import _ from 'lodash'
import PropTypes from 'prop-types';

const ListGroup = (props) => {
  const { items, textProperty, valueProperty, selectedItem, onItemSelect } = props;

  return (
    <ul className="list-group">
      { items.map(item => (
        <li key={item[valueProperty]}
          onClick={() => onItemSelect(item)} 
          className={item === selectedItem ? "list-group-item active" : "list-group-item"}
        >
          {_.capitalize(item[textProperty])}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  textProperty: PropTypes.string.isRequired,
  valueProperty: PropTypes.string.isRequired,
  selectedItem: PropTypes.string,
  onItemSelect: PropTypes.func.isRequired
}
 
export default ListGroup;