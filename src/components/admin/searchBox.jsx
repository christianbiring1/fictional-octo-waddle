import PropTypes from 'prop-types';

const SearchBox = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
}

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
}
 
export default SearchBox;
