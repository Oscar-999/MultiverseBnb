import "./SearchBox.css";
const SearchBox = ({ className, placeholder, onChangeHandler }) => (
  <div className="search-contain">
    <input
      className={`search-box ${className}`}
      type="search"
      placeholder={placeholder}
      onChange={onChangeHandler}
    />
  </div>
);

export default SearchBox;
